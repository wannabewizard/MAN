import React from "react";
import { Heading, Button } from 'rimble-ui';

class MintTokens extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { stackId: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.TestMinter;
    
    // let drizzle know we want to call the 'weeklyMint' method
    const stackId = contract.methods["weeklyMint"].cacheSend({
      from: drizzleState.accounts[0]
    });
  
    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;
  
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
  
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
  
    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;

    
  };  render() {
    return (
      <div>
        <Heading as={"h3"} style={{ textAlign: 'center' }}>Mint some MAN</Heading>
        <p><Button size='large' onClick={this.handleClick}>Mint &#x1F468;&#127995;</Button></p>
        <p>{this.getTxStatus()}</p>
      </div>
    );
  }
}

export default MintTokens;