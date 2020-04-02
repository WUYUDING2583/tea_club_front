import React from "react";
import { PageHeader, Button, Form, Input, Select, Spin, TreeSelect, Modal } from "antd";
import PictureCard from "../../../components/PictureCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {actions as articleActions} from "../../../redux/modules/article";
import { Redirect } from "react-router-dom";
import { map } from "../../../router";
import { formItemLayout, tailFormItemLayout } from "../../../utils/common";
import TagsSelect from "../../../components/TagsSelect";

const { confirm } = Modal;

class AddArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: new Array(),
            from: null,
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const { fileList } = this.state;
        const thiz = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                confirm({
                    title: '确认新增?',
                    content: '输入数据是否无误，确认新增该文章',
                    onCancel() {
                    },
                    onOk() {
                        const article={...values,photo:fileList[0]};
                        console.log("submit values", article);
                        thiz.props.addArticle(article)
                            .then(() => {
                                thiz.props.callMessage("success", "新增文章完成！")
                                thiz.setState({
                                    from: map.admin.AdminHome() + `/article_management/articles`
                                });
                            })
                            .catch((err) => {
                                thiz.props.callMessage("error", "新增文章失败！" + err)
                            })
                    },
                });

            }
        });
    };

    handleDisplayChange = (type, data) => {
        const { fileList } = this.state;
        switch (type) {
            case "done":
                console.log("add shop photo ", data);
                if (fileList.indexOf(data.uid) == -1) {
                    this.setState({ fileList: fileList.concat([data.uid]) });
                }
                break;
            case "removed":
                console.log("remove shop photo ", data);
                let newFileList = fileList.filter(uid => uid != data.uid);
                this.setState({ fileList: newFileList });
                break;
        }
    }


    render() {
        const { from } = this.state;
        if (from != null) {
            return <Redirect to={from} />;
        }
        const { getFieldDecorator } = this.props.form;
        const { retrieveRequestQuantity } = this.props;
        return (
            <PageHeader
                title="新增文章"
                onBack={this.props.handleBack}>
                <Spin spinning={retrieveRequestQuantity > 0}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="文章标题">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入文章标题!',
                                    },
                                ],
                            })(<Input allowClear />)}
                        </Form.Item>
                        <Form.Item label="标签">
                            {getFieldDecorator('tags', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择文章标签！",
                                    }
                                ],
                                initialValue:new Array()
                            })(
                               <TagsSelect/>
                            )}
                        </Form.Item>
                        <Form.Item label="文章链接">
                            {getFieldDecorator('url', {
                                rules: [{ required: true, message: '请输入文章链接!' }],
                            })(<Input allowClear />)}
                        </Form.Item>
                        <Form.Item label="文章展示图片">
                            <PictureCard max={1} onChange={this.handleDisplayChange} />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" block>
                                新增文章
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </PageHeader>
        )
    }
}
const mapStateToProps = (state) => {
    return {
       
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(articleActions, dispatch),
    };
};

const AddArticleForm = Form.create({ name: 'addArticle' })(AddArticle);
export default connect(mapStateToProps, mapDispatchToProps)(AddArticleForm);