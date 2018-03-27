
import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    previewsName: PT.string,
    notebooks: PT.array,
    myPagePreviews: PT.array,
    changePreviews: PT.func,
    initMyPage: PT.func,
    myInfo: PT.object,
    updateUserIntro: PT.func
}

export default class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.collectionClick = this.collectionClick.bind(this);
        this.notebookClick = this.notebookClick.bind(this);
    }

    collectionClick(collection_id, collection_name){
        this.props.changePreviews({collection_id}, collection_name);
    }

    notebookClick(collection_id, collection_name){
        this.collectionClick(collection_id, collection_name);
    }

    render(){

        let {previewsName, notebooks, myPagePreviews, location, initMyPage, myInfo, updateUserIntro} = this.props;

        let {userInfo} = location.state;

        let {collectionClick, notebookClick } = this;

        let isMe = false;

        if(myInfo){
            isMe = myInfo.user_id === userInfo.user_id;
            userInfo = myInfo;
        }

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo
                        {...{
                            userInfo,
                            initMyPage
                        }}
                    />
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList
                        {...{
                            previews: myPagePreviews,
                            collectionClick,
                            initMyPage
                        }}
                    />
                </div>
                <div className="four wide column">
                    <Aside
                        {...{
                            notebooks,
                            userInfo,
                            notebookClick,
                            isMe,
                            updateUserIntro
                        }}
                    />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
