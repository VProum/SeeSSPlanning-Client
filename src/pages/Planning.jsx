import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import FormDisplaySchedule from "../components/Forms/FormDisplaySchedule";
import { withUser } from "../components/Auth/withUser";
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
      "& .MuiChip-deleteIcon"  :{
        backgroundColor: "primary",
      }
    },
    
  },
});

class Planning extends Component {
  constructor(props) {
    super(props);

    this.handlefFormatSchedule = this.handlefFormatSchedule.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeColor = this.changeColor.bind(this);
    let changingColor = null;
  }

  state = {
    followingStreamers: [],
    filterStreamer: [],
    scheduleList: [],
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

    let scheduleListAll = [];
    let filterStreamerTmp = [...donotmutatefiltered];

    filterStreamerTmp.map(streamer => {
        
        if ( streamer.planningList.length > 0) {
          streamer.planningList.map(planningitem => {
            planningitem.colorBackground = "#342450";
            scheduleListAll.push(planningitem);
          });
        }
      
      //console.log(scheduleListAll)
    });
    this.setState({scheduleList : scheduleListAll});
  }
  
  handleDelete(e) {
    let donotmutate = [...this.state.filterStreamer];
    donotmutate.splice(e.currentTarget.parentElement.id, 1);
    this.setState({
      filterStreamer: donotmutate,
    });
  }

  handleNothing = () => {
    console.log("pouet");
  };

  handlefFormatSchedule() {
    let scheduleListAll = [];

    let filterStreamerTmp = [...this.state.filterStreamer];

    filterStreamerTmp.map((item, index) => {
      for (const prop in item) {
        //console.log("\r\nprop ", prop, "item ", item, "item[prop]", item[prop], "\r\n" )
        if (prop === "planningList" && item[prop].length > 0) {
          for (const titi in item[prop]) {
            scheduleListAll.push(item[prop][titi]);
          }
        }
      }
    });

    this.setState({scheduleList : scheduleListAll});
    return scheduleListAll;
  }

  changeColor(event, index) {
    const colorValue = event.currentTarget.value;
    let scheduleListAll = [];

    clearTimeout(this.changingColor);
    
    this.changingColor = setTimeout(() => {
      let donotmutate = [...this.state.filterStreamer];
      donotmutate[index].colorBackground = colorValue;
      this.setState({
        filterStreamer: donotmutate,
      });

      donotmutate.map((streamer,i) => {
        if ( streamer.planningList.length > 0) {
          streamer.planningList.map((planningitem, j) => {
            console.log(donotmutate[index].nickname, planningitem.streamer_name[0], donotmutate[index].nickname === planningitem.streamer_name[0])
            if(donotmutate[index].nickname === planningitem.streamer_name[0]){
              planningitem.colorBackground = colorValue;
            } 
            scheduleListAll.push(planningitem);
          });
        }
      
      });
      //console.log("bfkjoi",scheduleListAll)
    this.setState({scheduleList : scheduleListAll});
    }, 200);
  }

  render() {
    const { user } = this.props.context;
    return (
      <Grid columns={1}>
        <Grid.Column style={{display: "flex", backgroundColor: "#8877a6"}}>
          <Checkbox
            toggle
            checked={this.state.visible}
            label={{ children: <code>Add Plannings</code> }}
            onChange={(e, data) => {
              this.setState({
                dimmed: data.checked,
                visible: data.checked,
              });
            }}
          />

          {this.state.filterStreamer.map((item, i) => (
            <div key={i} style={{display: "flex",
                                flexDirection: "column"}}>
                  <Chip
                    avatar={<Avatar alt={item.nickname} src={item.avatar} />}
                    label={item.nickname}
                    onDelete={this.handleDelete}
                    id={i}
                  
                  />
                  <input
                    type="color"
                    onChange={(event, index = i) => this.changeColor(event, index)}
                  />
            </div>
          ))}
        </Grid.Column>

        <Grid.Column style={{padding: "0px"}}>
          <Sidebar.Pushable as={Segment} style={{height: "100vh"}}>
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
              width=""
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
            </Sidebar>

            <Sidebar.Pusher dimmed={this.state.dimmed} style={{backgroundColor: "#442d6b"}}>
              {/* <Segment basic>
                <Header as="h3">Application Content</Header>
                <Image src="https://static-cdn.jtvnw.net/jtv_user_pictures/9b1e0ea9-6dd0-40c1-b255-3f3cea8d1814-profile_image-300x300.png" />
              </Segment> */}
              <FormDisplaySchedule
                deleteSchedule={this.handleNothing}
                schedule_list={this.state.scheduleList}
              />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(withUser(Planning));
