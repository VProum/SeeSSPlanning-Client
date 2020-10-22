import React from "react";
import Hooks from "../components/Hooks";
import apiHandler from "../api/apiHandler";
import StreamerList from "../components/StreamerList";
import "./../styles/home.css";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
              See Simple Streamer Planning :
              <br /> Monitor all your favourite streamer plannings in one page
            </p>
          </div>
          <div className="landing-btn">
            <a href="#showall">
              {/* Check more than {this.state.allStreamers.length * 464} streamers */}
              Already {this.state.allStreamers.length} streamers registered 
            </a>
          </div>
        </section>

        <section className="poti-card">
          <h2>Improve your Twitch <br/>Experience</h2>
          <span>Organise your day as a moderator so you can know who is broadcasting</span>
          <div className="toto-card">
            <div>
              <Link to="/planning">

              <Card style={{ height: "300px", width: "400px" }}>
                <Image
                  src="https://cdn-wp.thesportsrush.com/2020/09/LOL-worlds.jpg"
                  wrapped
                  ui={false}
                  alt="blurry"
                  />
                <Card.Content style={{ background: "#e6ddf0" }}>
                  <Card.Header>See All Plannings</Card.Header>
                  <Card.Meta>Never miss a stream again</Card.Meta>
                </Card.Content>
              </Card>
                  </Link>
            </div>

            <div>
            <Link to="/schedule/edit">
              <Card style={{ height: "300px", width: "400px" }}>
                <Image
                  src="https://www.tiltreport.com/media/An_Inside_Look_At_The_Harsh_Reality_Of_Streaming_In_Malaysia.jpg"
                  wrapped
                  ui={false}
                  alt="blurry"
                />
                <Card.Content style={{ background: "#e6ddf0" }}>
                  <Card.Header>Schedule your Stream</Card.Header>
                  <Card.Meta>Share your planning with everybody</Card.Meta>
                </Card.Content>
              </Card>
              </Link>
            </div>

            <div>
            <Link to="/user/edit">
              <Card style={{ height: "300px", width: "400px" }}>
                <Image
                  src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc"
                  wrapped
                  ui={false}
                  alt="blurry"
                />
                <Card.Content style={{ background: "#e6ddf0" }}>
                  <Card.Header>Add Streamer to monitor</Card.Header>
                  <Card.Meta>
                    you can choose to follow whatever you want
                  </Card.Meta>
                </Card.Content>
              </Card>
              </Link>
            </div>
          </div>
        </section>

        <section id="showall">
          <div style={{ display: "grid" }}>
            <h1>See All the Streamers</h1>
          </div>
          <StreamerList userList={this.state.allStreamers} />
        </section>
      </div>
    );
  }
}

export default Home;
