import React, { Component } from 'react';
import { Layout, Upload, Button } from 'antd';
import { LineChart, ReferenceLine, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ReactFileReader from 'react-file-reader';
import 'antd/dist/antd.css';

const { Content } = Layout;

class App extends Component {
  state = {
    data: [],
    detDt: [],
  };
  handleFiles(files) {
    const reader = new FileReader();
    reader.onload = ((e) => {
      const cells = e.target.result.split('\n').map(el => el.split(/\s+/));
      const headings = cells.shift();
      const data = cells.map((el) => {
        const obj = {};
        for (let i = 0, l = el.length; i < l; i++) {
          obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
        }
        return obj;
      });
      this.setState({ data });
      // let detDt = [];
      //
      // for (let i = 1; i < data.length-1; i++) {
      //
      //   if (data[i].two < data[i - 1].two && data[i].two < data[i + 1].two) { detDt.append(data[i]);           console.log(i);}
      // }
      //
      // this.setState({ detDt });
    });
    reader.readAsText(files[0]);
  }
  render() {
    return (
      <Layout>
        <Content style={{ paddingTop: 24, paddingLeft: 100, paddingRight: 100, background: '#fff', minHeight: 280 }}>
          <ReactFileReader fileTypes=".txt" handleFiles={this.handleFiles.bind(this)}>
            <Button icon="upload">Upload</Button>
          </ReactFileReader>
          <ResponsiveContainer
            width="100%"
            height={450}
            style={{ paddingTop: '20px', paddingBottom: '20px' }}
          >
            <LineChart
              data={this.state.data}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="one" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line dataKey="two" stroke="#82ca9d" dot={false} />
              {/* <ReferenceLine x={3250.626536} stroke="red" label="Max PV PAGE" /> */}
              { this.state.detDt.map(d => <ReferenceLine key={d.one} x={d.one} stroke="red" label={d.one} />)}
            </LineChart>
          </ResponsiveContainer>
        </Content>
      </Layout>
    );
  }
}
export default App;
