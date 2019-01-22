import React from 'react';
import './index.scss';

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    uploadFile() {
        // 取file文件的方法
        let fileObject = document.getElementById('upload_file').files[0];
        // form表单要提交到的action地址
        const url = '/manage/product/upload.do';
        // FormData表单对象，ie9+才能使用
        let form = new FormData();
        // 将文件对象打入form实例，upload_file为后台指定的名称，取的是原有的input的name属性的值
        form.append('upload_file', fileObject);
        // xhr请求，文件类型只能通过post将form放到send里才能提交
        let xhr = new XMLHttpRequest();
        // 定义使用post方法，地址，是否使用异步
        xhr.open('POST', url, true);
        // 上传成功
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                this.onSuccess(JSON.parse(xhr.responseText));
            } else if (xhr.readyState == 4) {
                /*xhr fail*/
                client.errorTip('上传失败');
            }
        };
        // 上传失败
        xhr.onerror = () => {
            client.errorTip('上传失败');
        };
        // 开始上传
        xhr.send(form);
    }

    onSuccess(res) {
        console.log(res);
    }

    render() {
        return (
            <div className="file-uploader">
                <label htmlFor="upload_file" className="control-label">选择文件</label>
                <input type="file" className="form-control" id="upload_file" name="upload_file" style={{ display: 'none' }} />
                <button type="button" className="btn btn-primary" onClick={this.uploadFile.bind(this)}>上传</button>
            </div>
        )
    }
}

export default FileUploader;