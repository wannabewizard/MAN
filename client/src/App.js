import { Component } from 'react';
import ReadBalance from "./ReadBalance";
import MintTokens from './MintTokens';
import { Card, Flex, Box, Heading, Text } from 'rimble-ui';
import './App.css'

class App extends Component {
  
  state = { loading: true, drizzleState: null };
  
  componentDidMount() {
    const { drizzle } = this.props;
  
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
  
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
  
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Flex>
            <Box p={3} width={1}>
              <Heading as={"h1"} style={{ textAlign: 'center' }}>Welcome</Heading>
              <Text>To the MAN portal</Text>
            </Box>
          </Flex>
          <Flex>
            <Box p={3} width={1 / 2}>
              <Card>
                <MintTokens
                  drizzle={this.props.drizzle}
                  drizzleState={this.state.drizzleState}
                />
              </Card>
            </Box>
          <Box p={3} width={1 / 2}>
              <Card>
                <Heading as={"h3"}>Your info</Heading>
                  <Text>        
                    <ReadBalance
                    drizzle={this.props.drizzle}
                    drizzleState={this.state.drizzleState}
                    />
                  </Text>
              </Card>
            </Box>
            <Box p={3} width={1 / 2}>
              <Card>
                <div >
                <Heading as={"h3"}>MAN top 4</Heading>
                </div>
                <ol>
                  <li>0xwdda0s020q3839w3wf9wjff039j3jf99dj3110</li>
                  <li>0xw0dadaa0f20333383393f9jf039j3j99dj3110</li>
                  <li>0xw0020saa38393ff9jdadaaf039j3j99dj3110</li>
                  <li>0xw002038393f9jf0we39jwef3fj99dj23r0</li>
                </ol>
              </Card>
            </Box>
          </Flex>
        </div>
      </div>
    );
  }
}

export default App;
