import {Route, Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignUp from 'view/user/SignUp';
import SignIn from 'view/user/SignIn';
import MyPage from 'view/user/MyPage';
import Write from 'view/write/Write';
import LoginHint from 'layout/LoginHint';

import cfg from 'config/config.json';

import S from './style.scss';



export default class Frame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg: null,
            hasLoginReq: false,
            myPagePreviews: [],
            notebooks: [],
            previewsName: '所有文章'
        };

        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMsg = this.clearLoginMsg.bind(this);
        this.initMyInfo = this.initMyInfo.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviewsName = this.changePreviewsName.bind(this);
        this.changePreviews = this.changePreviews.bind(this);
        this.updateUserIntro = this.updateUserIntro.bind(this);
    }

    updateUserIntro(intro){
        let {myInfo} = this.state;

        myInfo.user_intro = intro;

        this.setState({myInfo});
    }

    initMyInfo(myInfo){

        if(myInfo){
            let {id, avatar, username, user_intro} = myInfo;
            avatar = cfg.url + avatar;

            myInfo = {
                user_id: id,
                avatar,
                user_name: username,
                user_intro
            };
        }


        this.setState({myInfo});
    }

    clearLoginMsg(){
        this.setState({
            signInMsg: null,
            signUpMsg: null
        });
    }

    signInAjax(reqData){
        $.post(`${cfg.url}/login`, reqData)
        .done(ret=>{

            let {code, data} = ret;



            if(code===0){
                this.initMyInfo(ret.data);
            }else{
                this.setState({signInMsg: ret});
            }

        });
    }

    signUpAjax(reqData){
        $.post(`${cfg.url}/register`, reqData)
        .done((ret)=>{
            let {code, data} = ret;

            this.setState({signUpMsg: ret});

            if(code===0){
                setTimeout(()=>{
                    this.initMyInfo(ret.data);
                });
            }


        });
    }

    logOut(){
        $.post(`${cfg.url}/logout`)
        .done(({code})=>{
            if(code===0){
                this.initMyInfo(null);
            }
        });
    }

    getPreview(data, previewsName){
        $.post(`${cfg.url}/getPreview`,data)
        .done(({code, data})=>{
            if(code===0){
                this.setState({
                    myPagePreviews: data,
                    previewsName
                });
            }
        });
    }

    changePreviews(data, previewsName){
        this.getPreview(data, previewsName);
    }

    // previewName 就是用户页头像下显示的那几个字
    initMyPage(user_id, previewsData, previewsName){
        this.getPreview(previewsData, previewsName);

        $.post(`${cfg.url}/getCollection`,{
            user_id
        })
        .done(({code, data})=>{
            if(code===0){
                this.setState({
                    notebooks: data
                });
            }
        });

    }

    changePreviewsName(previewsName){
        this.setState({previewsName});
    }

    componentDidMount(){
        $.post(`${cfg.url}/autologin`)
        .done(({code, data})=>{
            if(code===0){
                this.initMyInfo(data);
            }
            this.setState({hasLoginReq: true});
        });

        let {state, pathname} = this.props.location;
        if(state){
            let {user_id} = state.userInfo;

            if(pathname==='/my_page'){
                this.initMyPage(user_id, {user_id}, '所有文章');
            }



        }
    }


    render(){

        let {signInAjax, signUpAjax, clearLoginMsg, logOut, initMyPage, getPreview, changePreviews, updateUserIntro} = this;

        let {myInfo, signInMsg , signUpMsg, hasLoginReq, myPagePreviews, notebooks, previewsName} = this.state;

        let {history} = this.props;

        if(!hasLoginReq){
            return (<div></div>);
        }

        return (
            <div className={S.layout}>
                <Nav
                    {...{
                        myInfo,
                        logOut,
                        initMyPage,
                        history
                    }}
                />
                <Route exact path="/" render={
                    (props)=> (
                        <Home
                            {...{
                                initMyPage
                            }}
                            {...props}
                        />
                    )
                }/>

                <Route exact path="/sign_in" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignIn
                                {...{
                                    signInAjax,
                                    signInMsg,
                                    clearLoginMsg
                                }}
                            />
                        )

                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignUp
                                {...{
                                    signUpAjax,
                                    signUpMsg,
                                    clearLoginMsg
                                }}
                            />
                        )

                    )
                }/>
                <Route exact path="/my_page" render={
                    (props)=>(
                        props.location.state ? (
                            <MyPage
                                {...{
                                    myPagePreviews,
                                    previewsName,
                                    notebooks,
                                    changePreviews,
                                    initMyPage,
                                    myInfo,
                                    updateUserIntro
                                }}
                                {...props}
                            />
                        ) : (
                            <Redirect to="/"/>
                        )


                    )
                }/>
                <Route path="/write" render={
                    (props) => (
                        
                        myInfo ? (
                            <Write
                                {...{
                                    myInfo
                                }}
                            />
                        ) : (
                            <Redirect to="/login_hint"/>
                        )

                    )
                }/>

                <Route path="/login_hint" component={LoginHint}/>
            </div>
        );
    }
}
