export const defaultby = config => {
  const val = config;
  if (!val.echarts_series_symbol_rotate) val.echarts_series_symbol_rotate = 0;
  if (!val.echarts_series_symbol_rotate_2)
    val.echarts_series_symbol_rotate_2 = 0;
  if (!val.echarts_series_symbol_offset_horizontal) {
    val.echarts_series_symbol_offset_horizontal = 0;
  }
  if (!val.echarts_series_symbol_offset_horizontal_2) {
    val.echarts_series_symbol_offset_horizontal_2 = 0;
  }
  if (!val.echarts_series_symbol_offset_vertical) {
    val.echarts_series_symbol_offset_vertical = 0;
  }
  if (!val.echarts_series_symbol_offset_vertical_2) {
    val.echarts_series_symbol_offset_vertical_2 = 0;
  }
  if (!val.echarts_series_step) val.echarts_series_step = false;
  if (!val.echarts_series_step_2) val.echarts_series_step_2 = false;
  if (!val.echarts_series_area_style_opacity)
    val.echarts_series_area_style_opacity = 0;
  if (!val.echarts_series_area_style_opacity_2) {
    val.echarts_series_area_style_opacity_2 = 0;
  }
  if (!val.echarts_series_stack) val.echarts_series_stack = false;
  if (!val.echarts_series_stack_2) val.echarts_series_stack_2 = false;
  if (!val.echarts_series_smooth) val.echarts_series_smooth = false;
  if (!val.echarts_series_smooth_2) val.echarts_series_smooth_2 = false;
  if (!val.echarts_series_connect_nulls)
    val.echarts_series_connect_nulls = false;
  if (!val.echarts_series_connect_nulls_2)
    val.echarts_series_connect_nulls_2 = false;

  if (!val.echarts_x_axis_name) val.echarts_x_axis_name = "";
  if (!val.echarts_x_axis_name_rotate) val.echarts_x_axis_name_rotate = 0;
  if (!val.echarts_x_axis_label_rotate) val.echarts_x_axis_label_rotate = 0;
  if (!val.echarts_x_axis_inverse) val.echarts_x_axis_inverse = false;
  if (!val.echarts_x_axis_data_format) val.echarts_x_axis_data_format = false;

  if (!val.echarts_y_axis_name) val.echarts_y_axis_name = "";
  if (!val.echarts_y_axis_name_2) val.echarts_y_axis_name_2 = "";
  if (!val.echarts_y_axis_name_rotate) val.echarts_y_axis_name_rotate = "";
  if (!val.echarts_y_axis_name_rotate_2) val.echarts_y_axis_name_rotate_2 = "";
  if (!val.echarts_y_axis_label_rotate) val.echarts_y_axis_label_rotate = "";
  if (!val.echarts_y_axis_label_rotate_2)
    val.echarts_y_axis_label_rotate_2 = "";
  if (!val.echarts_y_axis_inverse) val.echarts_y_axis_inverse = "";
  if (!val.echarts_y_axis_inverse_2) val.echarts_y_axis_inverse_2 = "";

  if (!val.echarts_tooltip_formatter) val.echarts_tooltip_formatter = "";
  if (!val.echarts_tooltip_border_width) val.echarts_tooltip_border_width = 0;

  if (!val.echarts_toolbox_feature_magic_type_show) {
    val.echarts_toolbox_feature_magic_type_show = false;
  }
  if (!val.echarts_toolbox_feature_data_zoom_show) {
    val.echarts_toolbox_feature_data_zoom_show = false;
  }
  if (!val.echarts_toolbox_feature_restore_show) {
    val.echarts_toolbox_feature_restore_show = false;
  }
  return val;
};
