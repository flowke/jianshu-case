
import {Link, withRouter} from 'react-router-dom';
import S from './style.scss';
import cfg from 'config/config.json';

function Preview(props){

    let {
        article_id,
        article_title,
        previewContent,
        user_id,
        user_name,
        createdAt,
        avatar,
        user_intro,
        initMyPage,
        history
    } = props;

    // avatar = cfg.url + avatar;

    // createdAt = new Date(createdAt).toLocaleString();
    createdAt = '今天';

    return (
        <div className={`${S.note}`}>
            <div className="ui divider hidden"></div>
            <div className={`${S.content}`}>
                <div className={`${S.author}`}>
                    <Link to="/my_page"
                        className="avatar"

                        onClick={ev=>{
                            ev.stopPropagation();
                            ev.preventDefault();
                            history.push('/my_page', {
                                userInfo: {
                                    user_id,
                                    user_name,
                                    avatar,
                                    user_intro
                                }
                            });
                            initMyPage(user_id,{user_id}, '所有文章');
                        }}
                    >
                        <img src={avatar} alt="" className="ui avatar image"/>
                    </Link>
                    <div className={`${S.name}`}>
                        <Link to="/">{user_name}</Link>
                        <span className="time">{createdAt}</span>
                    </div>
                </div>
                <Link to="/" className={S.title}>{article_title}</Link>
                <p className={S.abstract}>
                    {previewContent}
                </p>
                <div className={S.meta}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default withRouter(Preview);
