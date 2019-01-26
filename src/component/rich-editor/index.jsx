import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import Editor from 'wangeditor'

class RichEditor extends React.Component {
    static propTypes = {
        onEditorChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new Editor(elem);
        // 配置服务器端地址
        editor.customConfig.uploadImgServer = '/manage/product/upload.do';
        // 配置服务器上传对应的字段
        editor.customConfig.uploadFileName = 'upload_file';
        // 自定义配置返回数据格式，不然按照默认的格式会报错
        editor.customConfig.uploadImgHooks = {
            customInsert: function(insertImg, result, editor) {
                if (result.status == 10) {
                    client.doLogin();
                } else {
                    insertImg(result.data.url);
                }
            }
        };
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = (html) => {
            this.props.onEditorChange(html);
        };
        editor.create();
    }

    render() {
        return (
            <div className="rich-editor">
                <div ref="editorElem" style={{ textAlign: 'left' }}></div>
            </div>
        );
    }
}

export default RichEditor;