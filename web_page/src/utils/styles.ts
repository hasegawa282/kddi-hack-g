
  // stylesの固定値を格納
const styles = {
    super_small_text_size: '8px',
    small_text_size: '12px',
    normal_text_size: '16px',
    interval_margin: '20px',
    interval_narrow_margin: '12px',
    interval_x_narrow_margin: '4px',
    login_padding_side: '30px',
    login_padding_top: '0px',
    opacity_hover: 0.8,
    opacity_disabled: 0.5,
    input_component_height: '35px',
    input_component_margin_bottom: '35px',
    sidemenu_height: '100vh',
    sidemenu_width: '105px',
    topmenu_height: '60px',
    topmenu_width: 'calc(100vw - 120px)',
    input_box_padding: '0px 16px',
    footer_height: '35px',
    table_radius_px: '5px',
    border_radius: '4px',
    box_shadow: '0px 3px 7px 0px #9E9E9E',
    whole_padding: '25px 30px',
    font_weight: 500,
    font_weight_light: 400,
    letter_spacing: '0px',
    super_small_button_width: '93px',
    super_small_button_height: '25px',
    small_button_width: '180px',
    dialog_video_width: '750px',
};

// テーブルセルの詳細ボタンなどのスタイル
export const table_cell_button_style = {
    width: styles.super_small_button_width,
    height: styles.super_small_button_height,
    marginRight: styles.interval_narrow_margin, // テーブルは左寄せでstyles.interval_narrow_marginのpaddingがあるので右側に同じ分の余白を定義
}

// テーブルセルの詳細ボタンなどの幅
export const table_cell_button_width = `calc(${styles.super_small_button_width} + 2 * ${styles.interval_narrow_margin})`

// テーブルセルのトグルボタンのスタイル
export const table_cell_toggle_button_style = {
    marginRight: styles.interval_narrow_margin, // テーブルは左寄せでstyles.interval_narrow_marginのpaddingがあるので右側に同じ分の余白を定義
}

// テーブルセルのトグルボタンの幅
export const table_cell_toggle_button_width = `calc(117px + 2 * ${styles.interval_narrow_margin})`


export default styles;

