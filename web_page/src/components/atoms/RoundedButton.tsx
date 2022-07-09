// -- basic library --
import React from 'react';
import styled from 'styled-components';
import { new_colors } from 'utils/colors';

// -- external components --
import styles, { table_cell_button_style } from 'utils/styles';

export type BUTTON_TEXT_TYPE = 'CREATE' | 'UPDATE' | 'DETAIL'

const getButtonTextFromType = (default_text = '', text_type?: BUTTON_TEXT_TYPE) => {
  let text = default_text
  switch(text_type){
    case 'CREATE':
      text = '作成'
      break;
    case 'UPDATE':
      text = '更新'
      break;
    case 'DETAIL':
      text = '詳細'
      break;
    default:
      text = default_text
  }
  return text
}

// -- type declaration --
interface Params {
  text?: string;
  text_type?: BUTTON_TEXT_TYPE;
  is_white?: boolean;
  stop_propagation?: boolean;
  useTableStyle?: true;
  is_margin_right?: boolean; // ボタンが連続で連なる時に右側にmarginを設定
  is_margin_left?: boolean; // ボタンが連続で連なる時に左側にmarginを設定
  small?: boolean;
}
/** 丸みのあるボタンを描画します。
 * text にボタンの文字を指定します。
 */
export default class RoundedButton extends React.Component<Params & React.ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    let new_props = {...this.props}
    if(this.props.is_margin_right){
      new_props.style = {...this.props.style, marginRight: styles.interval_narrow_margin}
    }
    if(this.props.is_margin_left){
      new_props.style = {...this.props.style, marginLeft: styles.interval_narrow_margin}
    }
    // tableのセル内のボタンのスタイル
    if(this.props.useTableStyle){
      new_props.style = {...new_props.style, ...table_cell_button_style}
    }
    if(this.props.small){
      new_props.style = {
        ...new_props.style, 
        width: styles.super_small_button_width, 
        height: styles.super_small_button_height
      }

    }
    if(this.props.stop_propagation){
      const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const on = this.props.onClick
        if(on){
          on(event)
        }
        // 親からのeventの伝達を止める
        event.stopPropagation()
      }
      new_props.onClick = onClick
    }
    return (
      <Button {...new_props}>
        {getButtonTextFromType(this.props.text, this.props.text_type)}
      </Button>
    );
  }
}

// -- styled components --

const Button = styled.button<{
  disabled?: boolean;
  is_white?: boolean;
}>`
  width: 240px;
  height: 35px;
  border-radius: 25px;
  background-color: ${(params) => (params.is_white ? new_colors.white : new_colors.component_main_color)};
  color: ${(params) => (params.is_white ? new_colors.component_main_color : new_colors.component_text_color)};
  border: ${(params) => (params.is_white ? `1px solid ${new_colors.component_main_color}` : 'none')};
  font-family: inherit;
  &:disabled {
    cursor: not-allowed;
    background-color: ${new_colors.disabled_background_color};
    color: ${new_colors.main_font_color};
  }
  &:hover {
    opacity: ${(params) => (params.disabled ? 1 : styles.opacity_hover)};
    cursor: ${(params) => (params.disabled ? 'not-allowed' : 'pointer')};
  }
  font-weight: ${styles.font_weight};
`;