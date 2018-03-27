
import SignInPanel from 'components/user/SignInPanel';
import EntryPanel from 'components/user/Panel';

let propTypes = {
    signInAjax: PT.func,
    signInMsg: PT.object,
    clearLoginMsg: PT.func
};

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUnmount(){
        this.props.clearLoginMsg();
    }

    render(){

        let {signInAjax, signInMsg} = this.props;

        return (
            <EntryPanel >
                <SignInPanel
                    {...{
                        signInAjax,
                        signInMsg
                    }}
                />
            </EntryPanel>
        );
    }
}

SignIn.propTypes = propTypes;
