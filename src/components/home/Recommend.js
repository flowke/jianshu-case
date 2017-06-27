import {Link} from 'react-router-dom';
import S from './style.scss';
import Author from './Author';

export default function Recommend({authors}){

    return (
        <div className={S.recommend}>
            <div className={S.title}>
                <span>作者列表</span>
            </div>
            <div className="ui items">
                {
                    authors.map((elt, i)=>{
                        return (
                            <Author
                                {...{
                                    user: elt
                                }}
                                key={i}
                            />);
                    })
                }
            </div>
        </div>
    );
}
