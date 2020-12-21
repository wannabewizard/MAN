import React from "react";

class ReadBalance extends React.Component {
  state = { dataKey: null };


  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.TestMinter;
    const dataKey = contract.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { TestMinter } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const balanceOf = TestMinter.balanceOf[this.state.dataKey];

    // if it exists, then we display its value
    return <p>Your MAN balance is: {(balanceOf && balanceOf.value)/1000000000000000000}</p>;
  }
}

export default ReadBalance;      