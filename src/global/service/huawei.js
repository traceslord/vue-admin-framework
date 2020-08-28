import axios from "@/global/request/axios";
import API from "@/global/request/api";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_MULTIPART_CHUNCK_SIZE = 3000000;

class HuaweiObsServiceError extends Error {}

export class HuaweiObsService {
  obsClientFactory({
    access_key_id,
    secret_access_key,
    server,
    security_token
  }) {
    // eslint-disable-next-line
    if (!ObsClient || typeof ObsClient !== "function") {
      return new HuaweiObsServiceError("Huawei ObsClient does not exist");
    }
    // eslint-disable-next-line
    return new ObsClient({
      access_key_id,
      secret_access_key,
      server,
      security_token
    });
  }
  getIdentity() {
    return axios.get(API.huaweiObs);
  }
  upload(file, platform) {
    return new Promise((resolve, reject) => {
      this.getIdentity()
        .then(response => {
          const { securityToken = {}, obs = {} } = response;
          const {
            access: access_key_id,
            secret: secret_access_key,
            securityToken: security_token
          } = securityToken;
          const { bucket, host, server } = obs;
          const obsInit = {
            access_key_id,
            secret_access_key,
            server,
            security_token
          };
          const type = file.name.substring(
            file.name.lastIndexOf(".") + 1,
            file.name.length
          );
          const filepath = [platform + type + "/", uuidv4(), ".", type].join(
            ""
          );
          const client = this.obsClientFactory(obsInit);
          client
            .putObject({
              Bucket: bucket,
              Key: filepath,
              Metadata: { property: "property-value" },
              SourceFile: file,
              ACL: "public-read"
            })
            .then(response => {
              const { CommonMsg = { Status: "" } } = response;
              const { Status: status } = CommonMsg;
              if (!!status && parseInt(status) === 200) {
                resolve({
                  response,
                  host,
                  filepath: `/${filepath}`,
                  name: file.name
                });
              } else {
                reject(response);
              }
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  multipartUpload(
    file,
    chunckSuccessCallback,
    successCallback,
    errorCallback,
    platform
  ) {
    const multipartUploadControl = { maxTaskCount: 6, currentTaskIndex: 0 };
    this.getIdentity()
      .then(response => {
        const { securityToken = {}, obs = {} } = response;
        const {
          access: access_key_id,
          secret: secret_access_key,
          securityToken: security_token
        } = securityToken;
        const { bucket, server, host } = obs;
        const obsInit = {
          access_key_id,
          secret_access_key,
          server,
          security_token
        };
        const type = file.name.substring(
          file.name.lastIndexOf(".") + 1,
          file.name.length
        );
        const filepath = [platform + type + "/", uuidv4(), ".", type].join("");
        const client = this.obsClientFactory(obsInit);
        client
          .initiateMultipartUpload({
            Bucket: bucket,
            Key: filepath,
            ACL: "public-read"
          })
          .then(initiateMultipartUploadResponse => {
            const uploadId =
              initiateMultipartUploadResponse.InterfaceResult.UploadId;
            const partCount =
              file.size % DEFAULT_MULTIPART_CHUNCK_SIZE === 0
                ? Math.floor(file.size / DEFAULT_MULTIPART_CHUNCK_SIZE)
                : Math.floor(file.size / DEFAULT_MULTIPART_CHUNCK_SIZE) + 1;
            const uploadPartStatus = {
              bucketName: bucket,
              objectKey: filepath,
              uploadId,
              file,
              fileSize: file.size,
              partSize: DEFAULT_MULTIPART_CHUNCK_SIZE,
              partCount,
              currentPartIndex: 0,
              completedChuncks: []
            };
            const multipartUploadPart = (obsClient, newUploadPartStatus) => {
              while (
                newUploadPartStatus.currentPartIndex <
                  newUploadPartStatus.partCount &&
                multipartUploadControl.currentTaskIndex <
                  multipartUploadControl.maxTaskCount
              ) {
                const chunckOffset =
                  newUploadPartStatus.currentPartIndex *
                  newUploadPartStatus.partSize;
                const currentChunckSize =
                  newUploadPartStatus.currentPartIndex + 1 ===
                  newUploadPartStatus.partCount
                    ? newUploadPartStatus.fileSize - chunckOffset
                    : newUploadPartStatus.partSize;
                const chunckNumber = newUploadPartStatus.currentPartIndex + 1;
                newUploadPartStatus.currentPartIndex = chunckNumber;
                multipartUploadControl.currentTaskIndex++;
                obsClient
                  .uploadPart({
                    Bucket: uploadPartStatus.bucketName,
                    Key: uploadPartStatus.objectKey,
                    PartNumber: chunckNumber,
                    UploadId: uploadPartStatus.uploadId,
                    SourceFile: uploadPartStatus.file,
                    Offset: chunckOffset,
                    PartSize: currentChunckSize
                  })
                  .then(newUploadPartResponse => {
                    multipartUploadControl.currentTaskIndex--;
                    if (newUploadPartResponse.CommonMsg.Status < 300) {
                      multipartUploadPart(obsClient, newUploadPartStatus);
                      newUploadPartStatus.completedChuncks.push({
                        PartNumber: chunckNumber,
                        ETag: newUploadPartResponse.InterfaceResult.ETag
                      });
                      chunckSuccessCallback(newUploadPartStatus);
                      if (
                        newUploadPartStatus.completedChuncks.length ===
                        newUploadPartStatus.partCount
                      ) {
                        var chuncks = newUploadPartStatus.completedChuncks.sort(
                          (a, b) => (a.PartNumber >= b.PartNumber ? 1 : -1)
                        );
                        obsClient.completeMultipartUpload(
                          {
                            Bucket: uploadPartStatus.bucketName,
                            Key: uploadPartStatus.objectKey,
                            UploadId: uploadPartStatus.uploadId,
                            Parts: chuncks
                          },
                          (err, result) => {
                            if (!err && result.CommonMsg.Status < 300) {
                              successCallback(result, host, file);
                            } else {
                              var msg = err || result.CommonMsg.Code;
                              errorCallback(msg);
                            }
                          }
                        );
                      }
                    }
                  })
                  .catch(errorCallback);
              }
            };
            multipartUploadPart(client, uploadPartStatus);
          });
      })
      .catch(errorCallback);
  }
}
