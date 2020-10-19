import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'umi';
import cities from '@/assets/geographic/city.json';
import provinces from '@/assets/geographic/province.json';
import styles from './GeographicView.less';

const { Option } = Select;
const nullSelectItem = {
  label: '',
  value: '',
  key: '',
};

class GeographicView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      provinces,
    };
  }

  UNSAFE_componentWillMount() {
    const { province } = this.props.value;
    if (province?.key) {
      this.setState({ cities: cities[province.key] });
    }
  }

  getOption = (list) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }

    return list.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = (item) => {
    const { onChange } = this.props;
    this.setState({ cities: cities[item.key] });

    if (onChange) {
      onChange({
        province: item,
        city: nullSelectItem,
      });
    }
  };

  selectCityItem = (item) => {
    const { value, onChange } = this.props;

    if (value && onChange) {
      onChange({
        province: value.province,
        city: item,
      });
    }
  };

  conversionObject() {
    const { value } = this.props;

    if (!value) {
      return {
        province: nullSelectItem,
        city: nullSelectItem,
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSelectItem,
      city: city || nullSelectItem,
    };
  }

  render() {
    const { province, city } = this.conversionObject();
    const { loading } = this.props;
    return (
      <Spin spinning={loading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
        >
          {this.getOption(this.state.provinces)}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
        >
          {this.getOption(this.state.cities)}
        </Select>
      </Spin>
    );
  }
}

export default connect(({ loading }) => {
  return {
    loading: loading.models.user,
  };
})(GeographicView);
