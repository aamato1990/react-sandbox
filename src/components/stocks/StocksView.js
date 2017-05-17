import React from "react";
import * as axios from "axios";

export class StocksView extends React.Component {
    constructor() {
  super();
  this.state = {
    tickers: "",
    quotes: []
  }
}

  handleSubmit(e) {
    e.preventDefault();
    const tickers = this.state.tickers;
    const url = `http://query.yahooapis.com/v1/public/yql?q=select Symbol, LastTradePriceOnly from yahoo.finance.quotes where symbol in ("${tickers}")&format=json&env=store://datatables.org/alltableswithkeys`
    axios.get(url).then((res) => {
      let newQuotes = this.state.quotes;
      newQuotes.push({
        lastTradePrice: res.data.query.results.quote.LastTradePriceOnly,
        symbol: res.data.query.results.quote.Symbol
      })
      this.setState({
        tickers: this.state.tickers,
        quotes: newQuotes
      });
    }).catch((err) => {
      console.error(err);
    })

  }

  handleChange(e) {
    const newTickers = e.target.value;
    this.setState({
      tickers: newTickers,
      quotes: this.state.quotes
    });
  }

  handleQuoteRemove(removeQuote) {
    console.log(removeQuote);
    const newQuotes = this.state.quotes.filter((stateQuote) => {
      return stateQuote.symbol !== removeQuote.symbol;
    });

    this.setState({
      tickers: this.state.tickers,
      quotes: newQuotes
    });
  }


  render() {
    const { tickers } = this.state;
    return (
    <div>
        <h2>Check your stocks!</h2>
        <form onSubmit={ e => this.handleSubmit(e)}>
          <input 
          type="text" 
          name="ticker"
          value={ tickers.value }
          onChange={ this.handleChange.bind(this) }/>
          <input type="submit" value="Submit"/>
        </form>
        {this.state.quotes.length > 0 ?
        (<div>
          {this.state.quotes.map((quote) => {
            return (
              <div>
                <div>{quote.lastTradePrice}</div>
                <div>{quote.symbol}</div>
              </div>
            );
          })
          }
        </div>): ""
        }
    </div>);
  }
}
