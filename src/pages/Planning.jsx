import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import FormDisplaySchedule from "../components/Forms/FormDisplaySchedule";

import {
  Checkbox,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
});

class Planning extends Component {
  constructor(props) {
    super(props);

    
    this.handlefFormatSchedule = this.handlefFormatSchedule.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    followingStreamers: [],
    filterStreamer: [],
    visible: false,
    dimmed: false,
  };

  async componentDidMount() {
    const donotmutate = await apiHandler.getUserFollow();
    //console.log("EditUser did mount", donotmutate);
    let donotmutatefiltered = [...donotmutate];
    //donotmutatefiltered.filter(item => item.planningList.length > 0);

    this.setState({
      followingStreamers: donotmutate,
      filterStreamer: donotmutatefiltered,
    });
  }

  handleDelete(e) {
    let donotmutate = [...this.state.filterStreamer]
    donotmutate.splice(e.currentTarget.parentElement.id, 1)
    this.setState({
        filterStreamer: donotmutate
    })
  }

  handleNothing = () => {
   console.log("pouet");
  }
  
  handlefFormatSchedule(){
    let scheduleListAll = [];
   
    let filterStreamerTmp = [...this.state.filterStreamer];

    filterStreamerTmp.map((item, index) =>{
      for (const prop in item){
        if(prop === "planningList" && item[prop].length > 0) {
          for (const titi in item[prop]){
            scheduleListAll.push(item[prop][titi]);
          }
        }
      }
    })
   
    return scheduleListAll;
  }


  render() {
    this.handlefFormatSchedule();
   
    return (
      <Grid columns={1}>
        <Grid.Column>
          <Checkbox
            toggle
            checked={this.state.visible}
            label={{ children: <code>Show filter</code> }}
            onChange={(e, data) => {
              this.setState({
                dimmed: data.checked,
                visible: data.checked,
              });
            }}
          />

          {this.state.filterStreamer.map((item, i) => (
              <React.Fragment key={i}>
              <Chip
                avatar={<Avatar alt={item.nickname} src={item.avatar} />}
                label={item.nickname}
                onDelete={this.handleDelete}
                id={i}
                />
            </React.Fragment>
          ))}
        </Grid.Column>
        

         <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="push"
              inverted
              onHide={() => {
                  this.setState({
                      dimmed: false,
                      visible: false,
                    });
                }}
                vertical
                visible={this.state.visible}
                width="thin"
                >
              {this.state.followingStreamers.map((item, i) => (
                  <Menu.Item
                  key={i}
                  index={i}
                  onClick={(e, data) => {
                     
                      let donotmutate = [...this.state.filterStreamer];
                      donotmutate.push(this.state.followingStreamers[data.index]);
                    donotmutate = [...new Set(donotmutate)];
                    this.setState({
                        filterStreamer: donotmutate,
                    });
                }}
                >
                  <Image src={item.avatar} alt="toto" avatar />
                  <span>{item.nickname}</span>
                </Menu.Item>
              ))}

              <Menu.Item>
                <Image
                  src="https://static-cdn.jtvnw.net/jtv_user_pictures/9b1e0ea9-6dd0-40c1-b255-3f3cea8d1814-profile_image-300x300.png"
                  alt="toto"
                  avatar
                />
                <span>MisterMV</span>
                <Segment inverted>
                  <Checkbox toggle />
                </Segment>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={this.state.dimmed}>
              {/* <Segment basic>
                <Header as="h3">Application Content</Header>
                <Image src="https://static-cdn.jtvnw.net/jtv_user_pictures/9b1e0ea9-6dd0-40c1-b255-3f3cea8d1814-profile_image-300x300.png" />
              </Segment> */}
              <FormDisplaySchedule deleteSchedule={this.handleNothing} schedule_list={this.handlefFormatSchedule()} /> 
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column> 
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Planning);
