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
        this.state = {
            savePropsHtml: ''
        }
    }

    // props传入方法，调用父元素的方法时，也会触发这个钩子函数
    componentWillReceiveProps(nextProps) {
        if (nextProps.html !== this.state.savePropsHtml) {
            this.setState({
                savePropsHtml: nextProps.html
            }, () => this.editor.txt.html(nextProps.html));
        }
    }

    componentDidMount() {
        const elem = this.refs.editorElem;
        this.editor = new Editor(elem);
        // 配置服务器端地址
        this.editor.customConfig.uploadImgServer = '/manage/product/upload.do';
        // 配置服务器上传对应的字段
        this.editor.customConfig.uploadFileName = 'upload_file';
        // 自定义配置返回数据格式，不然按照默认的格式会报错
        this.editor.customConfig.uploadImgHooks = {
            customInsert: function(insertImg, result, editor) {
                if (result.status === 0) {
                    insertImg(result.data.url);
                } else if (result.status === 10) {
                    client.doLogin();
                } else {
                    client.errorTip('图片上传错误，请重试');
                }
            }
        };
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.editor.customConfig.onchange = (html) => {
            this.props.onEditorChange(html);
        };
        this.editor.create();
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