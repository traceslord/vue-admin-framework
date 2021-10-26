export const defaultby = config => {
  const val = config;

  // series
  if (!val.echarts_series_show_symbol) val.echarts_series_show_symbol = false;
  if (!val.echarts_series_show_symbol_2)
    val.echarts_series_show_symbol_2 = false;
  if (!val.echarts_series_symbol_size_width)
    val.echarts_series_symbol_size_width = 0;
  if (!val.echarts_series_symbol_size_width_2)
    val.echarts_series_symbol_size_width_2 = 0;
  if (!val.echarts_series_symbol_size_height)
    val.echarts_series_symbol_size_height = 0;
  if (!val.echarts_series_symbol_size_height_2) {
    val.echarts_series_symbol_size_height_2 = 0;
  }
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
  if (!val.echarts_series_line_style_width)
    val.echarts_series_line_style_width = 0;
  if (!val.echarts_series_line_style_width_2)
    val.echarts_series_line_style_width_2 = 0;
  if (!val.echarts_series_line_style_opacity)
    val.echarts_series_line_style_opacity = 0;
  if (!val.echarts_series_line_style_opacity_2) {
    val.echarts_series_line_style_opacity_2 = 0;
  }
  if (!val.echarts_series_area_style_opacity)
    val.echarts_series_area_style_opacity = 0;
  if (!val.echarts_series_area_style_opacity_2) {
    val.echarts_series_area_style_opacity_2 = 0;
  }
  if (!val.echarts_series_stack) val.echarts_series_stack = false;
  if (!val.echarts_series_stack_2) val.echarts_series_stack_2 = false;
  if (!val.echarts_series_smooth) val.echarts_series_smooth = false;
  if (!val.echarts_series_smooth_2) val.echarts_series_smooth_2 = false;
  if (!val.echarts_series_legend_hover_link) {
    val.echarts_series_legend_hover_link = false;
  }
  if (!val.echarts_series_legend_hover_link_2) {
    val.echarts_series_legend_hover_link_2 = false;
  }
  if (!val.echarts_series_connect_nulls)
    val.echarts_series_connect_nulls = false;
  if (!val.echarts_series_connect_nulls_2)
    val.echarts_series_connect_nulls_2 = false;

  if (!val.echarts_series_bar_width) val.echarts_series_bar_width = "";
  if (!val.echarts_series_bar_max_width) val.echarts_series_bar_max_width = "";
  if (!val.echarts_series_bar_min_width) val.echarts_series_bar_min_width = "";
  if (!val.echarts_series_bar_min_height)
    val.echarts_series_bar_min_height = null;
  if (!val.echarts_series_bar_gap) val.echarts_series_bar_gap = "";
  if (!val.echarts_series_bar_category_gap)
    val.echarts_series_bar_category_gap = "";
  if (!val.echarts_axis_swap) val.echarts_axis_swap = false;

  if (!val.echarts_series_name) val.echarts_series_name = "";
  if (!val.echarts_pie_start_angle) val.echarts_pie_start_angle = 0;
  if (!val.echarts_pie_min_angle) val.echarts_pie_min_angle = 0;
  if (!val.echarts_pie_min_show_label_angle)
    val.echarts_pie_min_show_label_angle = 0;
  if (!val.echarts_pie_rose_type) val.echarts_pie_rose_type = null;
  if (!val.echarts_pie_top) val.echarts_pie_top = "";
  if (!val.echarts_pie_bottom) val.echarts_pie_bottom = "";
  if (!val.echarts_pie_left) val.echarts_pie_left = "";
  if (!val.echarts_pie_right) val.echarts_pie_right = "";
  if (!val.echarts_pie_width) val.echarts_pie_width = "";
  if (!val.echarts_pie_height) val.echarts_pie_height = "";
  if (!val.echarts_series_center_1) val.echarts_series_center_1 = "";
  if (!val.echarts_series_center_2) val.echarts_series_center_2 = "";
  if (!val.echarts_series_radius_1) val.echarts_series_radius_1 = "";
  if (!val.echarts_series_radius_2) val.echarts_series_radius_2 = "";
  if (!val.echarts_pie_label_show) val.echarts_pie_label_show = false;
  if (!val.echarts_pie_clockwise) val.echarts_pie_clockwise = false;
  if (!val.echarts_pie_avoid_label_overlap)
    val.echarts_pie_avoid_label_overlap = false;
  if (!val.echarts_pie_still_show_zero_sum)
    val.echarts_pie_still_show_zero_sum = false;

  if (!val.echarts_hydrograph_font_size) val.echarts_hydrograph_font_size = 0;
  if (!val.echarts_hydrograph_warning_threshold)
    val.echarts_hydrograph_warning_threshold = 0;
  if (!val.echarts_hydrograph_danger_threshold)
    val.echarts_hydrograph_danger_threshold = 0;
  if (!val.echarts_hydrograph_outline_show)
    val.echarts_hydrograph_outline_show = false;
  if (!val.echarts_hydrograph_outline_border_width)
    val.echarts_hydrograph_outline_border_width = 0;
  if (!val.echarts_hydrograph_outline_border_distance)
    val.echarts_hydrograph_outline_border_distance = 0;

  // legend
  if (!val.echarts_legend_show) val.echarts_legend_show = false;
  if (!val.echarts_legend_top) val.echarts_legend_top = "";
  if (!val.echarts_legend_bottom) val.echarts_legend_bottom = "";
  if (!val.echarts_legend_left) val.echarts_legend_left = "";
  if (!val.echarts_legend_right) val.echarts_legend_right = "";
  if (!val.echarts_legend_width) val.echarts_legend_width = "";
  if (!val.echarts_legend_height) val.echarts_legend_height = "";
  if (!val.echarts_legend_padding_top) val.echarts_legend_padding_top = 0;
  if (!val.echarts_legend_padding_bottom) val.echarts_legend_padding_bottom = 0;
  if (!val.echarts_legend_padding_left) val.echarts_legend_padding_left = 0;
  if (!val.echarts_legend_padding_right) val.echarts_legend_padding_right = 0;
  if (!val.echarts_legend_item_gap) val.echarts_legend_item_gap = 0;
  if (!val.echarts_legend_item_width) val.echarts_legend_item_width = 0;
  if (!val.echarts_legend_item_height) val.echarts_legend_item_height = 0;

  // grid
  if (!val.echarts_grid_show) val.echarts_grid_show = false;
  if (!val.echarts_grid_top) val.echarts_grid_top = "";
  if (!val.echarts_grid_bottom) val.echarts_grid_bottom = "";
  if (!val.echarts_grid_left) val.echarts_grid_left = "";
  if (!val.echarts_grid_right) val.echarts_grid_right = "";
  if (!val.echarts_grid_width) val.echarts_grid_width = "";
  if (!val.echarts_grid_height) val.echarts_grid_height = "";
  if (!val.echarts_grid_border_width) val.echarts_grid_border_width = 0;
  if (!val.echarts_grid_contain_label) val.echarts_grid_contain_label = false;

  // xAxis
  if (!val.echarts_x_axis_show) val.echarts_x_axis_show = false;
  if (!val.echarts_x_axis_name) val.echarts_x_axis_name = "";
  if (!val.echarts_x_axis_name_gap) val.echarts_x_axis_name_gap = 0;
  if (!val.echarts_x_axis_name_rotate) val.echarts_x_axis_name_rotate = 0;
  if (!val.echarts_x_axis_label_rotate) val.echarts_x_axis_label_rotate = 0;
  if (!val.echarts_x_axis_inverse) val.echarts_x_axis_inverse = false;
  if (!val.echarts_x_axis_data_format) val.echarts_x_axis_data_format = false;
  if (!val.echarts_x_axis_data_format_type)
    val.echarts_x_axis_data_format_type = "";
  if (!val.echarts_x_axis_label_interval)
    val.echarts_x_axis_label_interval = "";
  if (!val.echarts_x_axis_scale) val.echarts_x_axis_scale = false;

  // yAxis
  if (!val.echarts_y_axis_show) val.echarts_y_axis_show = false;
  if (!val.echarts_y_axis_show_2) val.echarts_y_axis_show_2 = false;
  if (!val.echarts_y_axis_name) val.echarts_y_axis_name = "";
  if (!val.echarts_y_axis_name_2) val.echarts_y_axis_name_2 = "";
  if (!val.echarts_y_axis_name_gap) val.echarts_y_axis_name_gap = 0;
  if (!val.echarts_y_axis_name_gap_2) val.echarts_y_axis_name_gap_2 = 0;
  if (!val.echarts_y_axis_name_rotate) val.echarts_y_axis_name_rotate = 0;
  if (!val.echarts_y_axis_name_rotate_2) val.echarts_y_axis_name_rotate_2 = 0;
  if (!val.echarts_y_axis_label_rotate) val.echarts_y_axis_label_rotate = 0;
  if (!val.echarts_y_axis_label_rotate_2) val.echarts_y_axis_label_rotate_2 = 0;
  if (!val.echarts_y_axis_inverse) val.echarts_y_axis_inverse = false;
  if (!val.echarts_y_axis_inverse_2) val.echarts_y_axis_inverse_2 = false;
  if (!val.echarts_y_axis_label_interval)
    val.echarts_y_axis_label_interval = "";
  if (!val.echarts_y_axis_label_interval_2)
    val.echarts_y_axis_label_interval_2 = "";
  if (!val.echarts_y_axis_scale) val.echarts_y_axis_scale = false;

  // tooltip
  if (!val.echarts_tooltip_show) val.echarts_tooltip_show = false;
  if (!val.echarts_tooltip_formatter) val.echarts_tooltip_formatter = "";
  if (!val.echarts_tooltip_padding_top) val.echarts_tooltip_padding_top = 0;
  if (!val.echarts_tooltip_padding_bottom)
    val.echarts_tooltip_padding_bottom = 0;
  if (!val.echarts_tooltip_padding_left) val.echarts_tooltip_padding_left = 0;
  if (!val.echarts_tooltip_padding_right) val.echarts_tooltip_padding_right = 0;
  if (!val.echarts_tooltip_border_width) val.echarts_tooltip_border_width = 0;

  // toolbox
  if (!val.echarts_toolbox_feature_save_as_image_show) {
    val.echarts_toolbox_feature_save_as_image_show = false;
  }
  if (!val.echarts_toolbox_feature_data_view_show) {
    val.echarts_toolbox_feature_data_view_show = false;
  }
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
