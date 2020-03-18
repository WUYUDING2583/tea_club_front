import React from 'react';
import {Button, Icon, Divider,  Input, Spin,  Tooltip, Table } from "antd";
import {map} from "../router";
import Highlighter from 'react-highlight-words';
import { Link } from "react-router-dom";

class OrderList extends React.Component {

  state = {
    searchText: '',
    searchedColumn: '',
  };

  componentDidMount() {
    // this.props.fetchAllCustomers();
    // this.props.fetchCustomerType();
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  getDataSource = () => {
    // const { customers, byCustomers, byCustomerType } = this.props;
    let dataSource = new Array();
    // customers.length > 0 && customers.forEach((uid) => {
    //   try {
    //     const dataItem = {
    //       key: uid,
    //       ...byCustomers[uid],
    //       customerType: byCustomerType[byCustomers[uid].customerType].name,
    //       sex: sex[byCustomers[uid].sex],
    //     };
    //     dataSource.push(dataItem);
    //   } catch (err) {
    //     // console.error(err);
    //   };

    // })
    return dataSource;
  }

  getColmuns = () => {
    // const { match } = this.props;
    return [
      {
        title: '订单编号',
        dataIndex: 'uid',
        key: 'uid',
        ...this.getColumnSearchProps('uid'),
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        ...this.getColumnSearchProps('productName'),
      },
      {
        title: '数量',
        dataIndex: 'number',
        key: 'number',
        ...this.getColumnSearchProps('number'),
      },
      {
        title: '提单时间',
        dataIndex: 'orderTime',
        key: 'orderTime',
        ...this.getColumnSearchProps('orderTime'),
      },
      {
        title: '提单人（账号ID）',
        dataIndex: 'customerId',
        key: 'customerId',
        ...this.getColumnSearchProps('customerId'),
      },
      {
        title: '状态',
        dataIndex: 'customerType',
        key: 'customerType',
        ...this.getColumnSearchProps('customerType'),
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <span>
            <Tooltip title={`查看订单详情`}>
              <Link to={`${map.admin.AdminHome()}/order_management/orders/order/${record.uid}`}>详情</Link>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title={`删除此订单`}>
              <Button type="link" onClick={() => this.deleteOrder(record.uid)}>删除</Button>
            </Tooltip>
          </span>
        ),
      }
    ];
  }

  deleteOrder=(uid)=>{

  }

  render() {
    const {requestQuantity}=this.props;
    const data = this.getDataSource();
    const columns = this.getColmuns();
    return (
      <div>
        <Spin spinning={requestQuantity > 0}>
          <Table
            columns={columns}
            loading={requestQuantity > 0}
            dataSource={data} />
        </Spin>
      </div>
    )
  }
}

export default OrderList;