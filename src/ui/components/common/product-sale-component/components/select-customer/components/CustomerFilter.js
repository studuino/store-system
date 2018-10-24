import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import styled from 'styled-components';

import { RowItem, Row } from '../../../../FormUtils';
import Input from '../../../../CustomInput';

import Filter, { FILTER_TYPES } from '../../../../Filter';

const Wrapper = styled.div`
  width: 100%:
`;

const Name = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
`;

const IdentificationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const IdentificationName = styled.p`
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;

const IdentificationItemWrapper = styled.div`
  display: flex;
  margin-right: 16px;
`;

const DefaultText = styled.span`
  font-size: 16px;
`;

const filterConfig = [{
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Nome',
  dataField: 'name',
}, {
  type: FILTER_TYPES.TEXT,
  filterTitle: 'CPF',
  dataField: 'cpf',
}, {
  type: FILTER_TYPES.TEXT,
  filterTitle: 'RG',
  dataField: 'rg',
}];

const styles = () => ({
  root: {
    marginLeft: 250,
    width: '60%',
  },
});

type Props = {
  onChooseCustomer: Function,
  customers: Array<Object>,
  classes: Object,
};

type State = {
  customersFiltered: Array<Object>,
  customerSelected: Object,
  isListOpen: boolean,
};

class CustomerFilter extends Component<Props, State> {
  state = {
    customersFiltered: [],
    customerSelected: {},
    isListOpen: false,
  };

  onChooseCustomer = (customer: Object): void => {
    const { onChooseCustomer } = this.props;

    this.setState({
      customerSelected: customer,
      isListOpen: false,
    }, () => onChooseCustomer(customer));
  };

  onFilterData = (customersFiltered: Array<Object>): void => {
    this.setState({
      isListOpen: (customersFiltered.length > 0),
      customersFiltered,
    });
  };

  renderIdentificationItem = (type: string, item: string): Object => (
    <IdentificationItemWrapper>
      <IdentificationName>
        {`${type}:`}
      </IdentificationName>
      <DefaultText>
        {item}
      </DefaultText>
    </IdentificationItemWrapper>
  );

  renderListItem = (customer: Object): Object => {
    const { name, cpf, rg } = customer;

    return (
      <ListItem
        button
        onClick={() => this.onChooseCustomer(customer)}
      >
        <div>
          <Name>
            {name}
          </Name>
          <IdentificationWrapper>
            {this.renderIdentificationItem('CPF', cpf)}
            {this.renderIdentificationItem('RG', rg)}
          </IdentificationWrapper>
        </div>
      </ListItem>
    );
  };

  renderCustomerList = (): Object => {
    const { customersFiltered } = this.state;
    const { classes } = this.props;

    return (
      <Paper
        className={classes.root}
      >
        <List
          component="nav"
        >
          {customersFiltered.map((customer, index) => (
            <Fragment
              key={customer.id}
            >
              {this.renderListItem(customer)}
              {index < (customersFiltered.length - 1) && (
                <Divider
                  light
                />
              )}
            </Fragment>
          ))}
        </List>
      </Paper>
    );
  }

  renderCustomerSelectedInput = (): Object => {
    const { customerSelected } = this.state;

    return (
      <Fragment>
        <Row>
          <RowItem>
            <Input
              placeholder="Selecione um Cliente"
              value={customerSelected.name}
              label="Cliente Selecionado"
              id="customerSelected"
              onChange={() => {}}
              onBlur={() => {}}
              type="text"
              disabled
              error=""
            />
          </RowItem>
        </Row>
      </Fragment>
    );
  };

  renderFilter = (): Object => {
    const { customers } = this.props;

    return (
      <Filter
        shouldFilterAfterSelectFilter={false}
        onFilterData={this.onFilterData}
        filterConfig={filterConfig}
        dataset={customers}
      />
    );
  }

  render() {
    const { isListOpen, customersFiltered } = this.state;

    const shouldShowList = (isListOpen && customersFiltered.length);

    return (
      <Wrapper>
        {this.renderCustomerSelectedInput()}
        {this.renderFilter()}
        {shouldShowList && this.renderCustomerList()}
      </Wrapper>
    );
  }
}

export default withStyles(styles)(CustomerFilter);
