
import {Component} from 'react';
import cfg from 'config/config.json';
import S from './style.scss';

let propTypes = {

}

export default class Write extends Component{

    constructor(props){
      super(props);

      this.state = {
        collections: [],
        collectionID: null,
        titleVal: '',
        collectionVal: '',
        contentVal: ''
      }

      this.collectionName = {};
    }

    changeTitle=(ev)=>{
      this.setState({titleVal: ev.target.value})
    }
    changeContent=(ev)=>{
      this.setState({contentVal: ev.target.value})
    }
    changeCollection=(ev)=>{
      this.setState({collectionVal: ev.target.value})
    }

    submitArticle=(ev)=>{
      ev.stopPropagation();
      ev.preventDefault();

      let {value: collectionID} = this.refs.cltIDInput;

      if(collectionID){

        let {
          titleVal: article_title,
          contentVal: article_content
        } = this.state;

        let {user_id} = this.props.myInfo;

        let collection_name = this.collectionName[collectionID];

        $.post(`${cfg.url}/addArticle`, {
          article_title,
          article_content,
          user_id,
          collection_id: collectionID,
          collection_name
        })
          .done(({code})=>{
            if(code===0){
              this.setState({
                titleVal: '',
                contentVal: ''
              })
            }
          })
      }

    }

    addCollection=(ev)=>{
      if(ev.keyCode===13){
        $.post(`${cfg.url}/addCollection`,{
          name: this.state.collectionVal,
          user_id: this.props.myInfo.user_id
        })
          .done(({code, data})=>{
            if(code===0){
              this.setState({
                collectionVal: '',
                collections: data
              })
            }
          })
      }
    }

    componentDidMount(){
      let {user_id} = this.props.myInfo;

      $.post(`${cfg.url}/getCollection`, {user_id})
        .done(({code, data})=>{
          if(code===0){
            console.log(data);
            this.setState({collections: data})
          }
        });

      $(this.refs.dropdown).dropdown();
    }

    componentWillUnmount(){
      $(this.refs.dropdown).off();
    }

    render(){

        let {
          collections,
          collectionID,
          titleVal,
          collectionVal,
          contentVal
        } = this.state;
        collections = collections.map(({id, collection_name},i)=>{

            this.collectionName[id] = collection_name;

            return (
                <div className="item"
                  key={i}
                  data-value={id}
                >
                    {collection_name}
                </div>
            )
        })

        return(
            <div className="ui container">
              <header className="ui header dividing">
                <h1>写文章</h1>
              </header>
              <form
                className="ui form"
                onSubmit={this.submitArticle}
              >
                <div className="field">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="标题"
                    value={titleVal}
                    onChange={this.changeTitle}
                  />
                </div>
                <div className="fields">
                  <div className="field five wide column required">
                    <div
                      className="ui selection dropdown" id="writeArtical"
                      ref="dropdown"
                    >
                      <input
                        type="hidden"
                        name="album"
                        ref="cltIDInput"
                      />
                      <div className="default text">选择一个文集</div>
                      <i className="dropdown icon"></i>
                      <div className="menu">
                        {collections}
                      </div>
                    </div>
                  </div>
                  <div className="field eleven wide column">
                    <input
                      type="text"
                      className=""
                      placeholder="回车, 添加文集"
                      value={collectionVal}
                      onChange={this.changeCollection}
                      onKeyDown={this.addCollection}
                    />
                  </div>
                </div>
                <div className="field">
                  <textarea
                    rows="16"
                    className=""
                    placeholder="随便写点文字. . ."
                    value={contentVal}
                    onChange={this.changeContent}

                  >
                  </textarea>
                </div>
                <div className="field">
                  <button type="submit"
                    className="ui button primary"
                  >保存</button>
                </div>

              </form>
            </div>
        )
    }
}

Write.propTypes = propTypes;
