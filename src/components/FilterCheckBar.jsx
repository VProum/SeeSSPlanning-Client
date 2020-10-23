import React from "react";
import {
  Checkbox,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  Sidebar,
  Label,
  Icon
} from "semantic-ui-react";

const FilterCheckBar = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [dimmed, setDimmed] = React.useState(false);
  const [test, settest] = React.useState([]);

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox
          toggle
          checked={visible}
          label={{ children: <code>Show filter</code> }}
          onChange={(e, data) => {
            setVisible(data.checked);
            setDimmed(data.checked);
          }}
        />
        <Image
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/9b1e0ea9-6dd0-40c1-b255-3f3cea8d1814-profile_image-300x300.png"
          alt="toto"
          avatar
        />
        <span>MisterMV</span>
        <Label image>
          <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/9b1e0ea9-6dd0-40c1-b255-3f3cea8d1814-profile_image-300x300.png" alt="toto"/>
          Adrienne
          <Icon name="delete" />
        </Label>
      </Grid.Column>

      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            inverted
            onHide={() => {
              setVisible(false);
              setDimmed(false);
            }}
            vertical
            visible={visible}
            width="thin"
          >
            {props.streamersList.map((item, i) => (
              <Menu.Item
                key={i}
                index={i}
                onClick={(e, data) => {
                  // console.log(e.currentTarget, data);
                  settest(data.index);
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

          <Sidebar.Pusher dimmed={dimmed}>
            <Segment basic>
              <Header as="h3">Application Content</Header>
              <Image src="https://static-cdn.jtvnw.net/jtv_user_pictures/9b1e0ea9-6dd0-40c1-b255-3f3cea8d1814-profile_image-300x300.png" />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default FilterCheckBar;
