import React from "react";
import Hooks from "../components/Hooks";
import apiHandler from "../api/apiHandler";
import StreamerList from "../components/StreamerList";
import "./../styles/home.css";
import { Card, Icon, Image } from "semantic-ui-react";

class Home extends React.Component {
  state = {
    allStreamers: [],
  };

  async componentDidMount() {
    const donotmutate = await apiHandler.getStreamer();
    //console.log("addstreamer did mount");
    this.setState({
      allStreamers: donotmutate,
    });
  }

  render() {
    return (
      <div className="homepage">
        <section className="landing">
          <h1>
            <span className="text-focus-in">
              Made by G@m3rz
              <br />
              for Streamers
            </span>
          </h1>
          <div className="sub-title">
            <p>
              See Simple Streamer Planning : Monitor all your favourite streamer
              plannings in one page
            </p>
          </div>
          <div className="landing-btn">
            <a href="#showall">
              More than {this.state.allStreamers.length * 464} streamers
              registered
            </a>
          </div>
        </section>

        <section className="poti-card">
          <div>

            <Card color="teal" style={{ height: "300px", width: "400px" }}>
              <Image
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc"
                wrapped
                ui={false}
                alt="blurry"
              />
              <Card.Content style={{ background: "#e6ddf0" }}>
                <Card.Header>
                  See All Plannings
                </Card.Header>
                <Card.Meta>
                  Display what you want
                </Card.Meta>
              </Card.Content>
            </Card>
          </div>
          <div>

            <Card color="teal" style={{ height: "300px", width: "400px" }}>
              <Image
                src="https://www.tiltreport.com/media/An_Inside_Look_At_The_Harsh_Reality_Of_Streaming_In_Malaysia.jpg"
                wrapped
                ui={false}
                alt="blurry"
              />
              <Card.Content style={{ background: "#e6ddf0" }}>
                <Card.Header>
                  Schedule your Stream
                </Card.Header>
                <Card.Meta>
                  Share your planning with everybody
                </Card.Meta>
              </Card.Content>
            </Card>
          </div>

          <div>

            <Card color="teal" style={{ height: "300px", width: "400px" }}>
              <Image
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc"
                wrapped
                ui={false}
                alt="blurry"
              />
              <Card.Content style={{ background: "#e6ddf0" }}>
                <Card.Header>
                  Add Streamer to monitor
                </Card.Header>
                <Card.Meta>
                  you can choose to follow whatever you want
                </Card.Meta>
              </Card.Content>
            </Card>
          </div>

          
         
        </section>

        <section id="showall">
          <h1>See All the Streamers</h1>
          <StreamerList userList={this.state.allStreamers} />
        </section>
      </div>
    );
  }
}

export default Home;
