import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class FileUploader extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        onSuccess: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    emitInputClick(e) {
        let fileObject = document.getElementById('upload_file');
        fileObject.click();
    }

    changeFile(e) {
        // 有文件的时候才上传，点击取消后文件就没有了
        if (e.target.files[0]) {
            const name = e.target.files[0].name;
            let imgRegex = /\.(png|jpg|gif)$/;
            if (!imgRegex.test(name)) {
                alert('请选择图片类型的文件。');
            } else {
                this.uploadFile();
            }
        }
    }

    async uploadFile() {
        // 取file文件的方法
        let fileObject = document.getElementById('upload_file').files[0];
        // FormData表单对象，ie10+和其他浏览器才能使用，ie9和以下只能够使用原始form+iframe取回调
        let form = new FormData();
        // 将文件对象打入form实例，upload_file为后台指定的名称，取的是原有的input的name属性的值
        form.append('upload_file', fileObject);
        // xhr请求，文件类型只能通过post将form整个对象（不用序列化）放到send里才能提交
        try {
            let res = await client.request(this.props.url, form, 'post', true);
            this.props.onSuccess(res);
        } catch (err) {
            this.props.onError(err);
        }
    }

    onSuccess(res) {
        console.log(res);
    }

    render() {
        return (
            <div className="file-uploader">
                <div onClick={this.emitInputClick.bind(this)} style={{ display: 'inline-block' }}>{this.props.children}</div>
                <input type="file" className="form-control" id="upload_file" name="upload_file" onChange={this.changeFile.bind(this)} style={{ display: 'none' }} />
            </div>
        )
    }
}

export default FileUploader;