import React from 'react';
import './index.scss';

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            uploadedFile: '',
            uploadedFileUrl: ''
        }
    }

    changeFile(e) {
        if (e.target.files[0]) {
            this.setState({
                fileName: e.target.files[0].name
            });
        } else {
            this.setState({
                fileName: ''
            });
        }
    }

    async uploadFile() {
        if (!this.state.fileName) {
            client.errorTip('请选择文件');
            return;
        }
        // 取file文件的方法
        let fileObject = document.getElementById('upload_file').files[0];
        // FormData表单对象，ie10+和其他浏览器才能使用，ie9和以下只能够使用原始form+iframe取回调
        let form = new FormData();
        // 将文件对象打入form实例，upload_file为后台指定的名称，取的是原有的input的name属性的值
        form.append('upload_file', fileObject);
        // xhr请求，文件类型只能通过post将form整个对象（不用序列化）放到send里才能提交
        try {
            let res = await client.request('/manage/product/upload.do', form, 'post', true);
            this.setState({
                uploadedFile: this.state.fileName,
                uploadedFileUrl: res.url
            });
        } catch (err) {
            client.errorTip(err);
        }
    }

    onSuccess(res) {
        console.log(res);
    }

    render() {
        return (
            <div className="file-uploader">
                <label htmlFor="upload_file" className="control-label">点击选择文件</label>
                <input type="file" className="form-control" id="upload_file" name="upload_file" onChange={this.changeFile.bind(this)} style={{ display: 'none' }} />
                {
                    this.state.fileName ? <span>已选文件：{this.state.fileName}</span> : ''
                }
                <div className="btn-wrapper">
                    <button type="button" className="btn btn-primary" onClick={this.uploadFile.bind(this)}>上传</button>
                    {
                        this.state.uploadedFile ? <span style={{ marginLeft: '15px' }}>已上传文件：{this.state.uploadedFile}</span> : null
                    }
                </div>
            </div>
        )
    }
}

export default FileUploader;