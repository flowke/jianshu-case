import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';

import Validation from 'util/validation';

let propTypes = {
    signUpAjax: PT.func,
    signUpMsg: PT.object
};


export default class SignUpPanel extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            passw: '',
            cfPassw: '',
            nameErr: false,
            passwErr: false,
            cfPasswErr: false
        }

        this.validator = new Validation();

        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg: '用户名不能是空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'},
        ]);

        this.validator.addByValue('passw',[
            {strategy: 'isEmpty', errorMsg: '密码不能是空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'},
        ]);

        this.nameChange = this.nameChange.bind(this);
        this.passwChange = this.passwChange.bind(this);
        this.cfPasswChange = this.cfPasswChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    nameChange(ev){
        let {target} = ev;

        let msg = this.validator.valiOneByValue('username', target.value);

        console.log(msg);

        this.setState({
            username: target.value,
            nameErr: msg
        });

    }

    passwChange(ev){

        let {target} = ev;

        let msg = this.validator.valiOneByValue('passw', target.value);

        let {cfPasswErr} = this.state;

        this.setState({
            passw: ev.target.value,
            passwErr: msg
        });

        if(cfPasswErr){
            this.cfPasswChange();
        }

    }

    cfPasswChange(){
        let {passwDom, cfPasswDom} = this.refs;

        let cfPasswErr = passwDom.value === cfPasswDom.value ? '': '密码不一致';

        this.setState({
            cfPassw: cfPasswDom.value,
            cfPasswErr
        });

    }

    onSubmit(ev){
        ev.preventDefault();
        ev.stopPropagation();

        let {validator} = this;

        let {username, passw, cfPassw} = this.state;

        let nameErr = this.validator.valiOneByValue('username', username);
        let passwErr = this.validator.valiOneByValue('passw', passw);
        let cfPasswErr =  passw === cfPassw ? '': '密码不一致';

        this.setState({
            nameErr,
            passwErr,
            cfPasswErr
        });

        if(!nameErr && !passwErr && !cfPasswErr){
            this.props.signUpAjax({
                username, passw, cfPassw
            });
        }

    }

    render(){

        let {
            nameErr,
            passwErr,
            cfPasswErr,
            username,
            passw,
            cfPassw
        } = this.state;

        let {signUpMsg} = this.props;

        let {nameChange, passwChange, cfPasswChange, onSubmit} = this;

        let resInfo = null;

        if(signUpMsg){
            if(signUpMsg.code===0){
                resInfo = (
                    <div className="ui message positive">
                        <p>{signUpMsg.msg}</p>
                        <p>马上帮你登录</p>
                    </div>
                );
            }else{
                resInfo = (
                    <div className="ui message error">
                        <p>{signUpMsg.msg}</p>
                    </div>
                );
            }
        }



        let nameErrMsg = nameErr ? (
            <p className={S.err}>{nameErr}</p>
        ) : null;

        let passwErrMsg = passwErr ? (
            <p className={S.err}>{passwErr}</p>
        ) : null;

        let cfPasswErrMsg = cfPasswErr ? (
            <p className={S.err}>{cfPasswErr}</p>
        ) : null;

        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div className={`field ${nameErr ? 'error':''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            value={username}
                            onChange={nameChange}

                            ref="nameDom"
                        />
                        {nameErrMsg}
                    </div>
                    <div className={`field ${passwErr ? 'error':''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            value={passw}
                            onChange={passwChange}
                            ref="passwDom"
                        />
                        {passwErrMsg}
                    </div>
                    <div className={`field ${cfPasswErr ? 'error':''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            value={cfPassw}
                            onChange={cfPasswChange}
                            ref="cfPasswDom"
                        />
                        {cfPasswErrMsg}
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}

SignUpPanel.propTypes = propTypes;
