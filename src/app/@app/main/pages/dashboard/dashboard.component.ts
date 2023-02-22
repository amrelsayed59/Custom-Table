import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { CustomColumnModalComponent } from '@shared/components/custom-table/custom-column-modal/custom-column-modal.component';
import { TableColumn } from '@shared/components/custom-table/interface/TableColumn';
import { Customer } from './customers';
import { Order } from './order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  translationPrefix: string = `PAGES.NAVBAR.INPUTS.`;

  orders: Order[];
  ordersTableColumns: TableColumn[];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    //custom table
    this.initializeColumns();
    this.orders = this.getOrders();
  }


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    console.log('keyname', keyName);
    if (sortParameters.direction === 'asc') {
      if (keyName == 'amount' || keyName == 'price' || keyName == 'discount') {
        this.orders = this.orders.sort(
          (a: any, b: any) => a[keyName] - b[keyName]
        );
        console.log('orders number', this.orders);
      } else {
        this.orders = this.orders.sort((a: any, b: any) =>
          a[keyName].localeCompare(b[keyName])
        );
        console.log('orders string', this.orders);
      }
    } else if (sortParameters.direction === 'desc') {
      if (keyName == 'amount' || keyName == 'price' || keyName == 'discount') {
        this.orders = this.orders.sort(
          (a: any, b: any) => b[keyName] - a[keyName]
        );
      } else {
        this.orders = this.orders.sort((a: any, b: any) =>
          b[keyName].localeCompare(a[keyName])
        );
      }
    } else {
      return (this.orders = this.getOrders());
    }
    return;
  }

  initializeColumns(): void {
    this.ordersTableColumns = [
      {
        name: 'Agent',
        dataKey: 'agent',
        position: 'left',
        isSortable: true,
        isSearchable: true,
        show: true,
        filter: {
          type: 'string',
          value: '',
          show: false,
        },
      },
      {
        name: 'Campaign Role',
        dataKey: 'name',
        position: 'left',
        isSortable: true,
        isSearchable: true,
        show: true,
        filter: {
          type: 'string',
          value: '',
          show: false,
        },
      },
      {
        name: 'Country',
        dataKey: 'city',
        position: 'left',
        isSortable: true,
        isSearchable: true,
        show: true,
        filter: {
          type: 'string',
          value: '',
          show: false,
        },
      },
      {
        name: 'Roles Details',
        dataKey: 'amount',
        position: 'left',
        isSortable: true,
        isSearchable: true,
        show: true,
        filter: {
          type: 'select',
          value: 'Default',
          options: ['55', '67', '999'],
          show: false,
        },
      },
      {
        name: 'Active Users',
        dataKey: 'price',
        position: 'left',
        isSortable: true,
        isSearchable: true,
        show: true,
        filter: {
          type: 'string',
          value: '',
          show: false,
        },
      },
      {
        name: 'Discounts',
        dataKey: 'discount',
        position: 'left',
        isSortable: true,
        isSearchable: true,
        show: true,
      },
    ];
  }

  getOrders(): Order[] {
    return [
      {
        id: 1,
        agent: 'Amy Elsner',
        name: 'Senior',
        city: 'Cairo',
        amount: 55,
        price: 42.5,
        discount: 2,
      },
      {
        id: 2,
        agent: 'Asiya Javayant',
        name: 'Manager',
        city: 'France',
        amount: 2,
        price: 52.5,
        discount: 3,
      },
      {
        id: 3,
        agent: 'Xuxue Feng',
        name: 'Junior',
        city: 'America',
        amount: 3,
        price: 62.5,
        discount: 4,
      },
      {
        id: 4,
        agent: 'Asiya Javayant',
        name: 'Intern',
        city: 'Italy',
        amount: 4,
        price: 72.5,
        discount: 5,
      },
      {
        id: 5,
        agent: 'Ivan Magalhaes',
        name: 'Leader',
        city: 'India',
        amount: 5,
        price: 82.5,
        discount: 6,
      },
      {
        id: 6,
        agent: 'Onyama Limba',
        name: 'Bolivia',
        city: 'Algeria',
        amount: 1,
        price: 42.5,
        discount: 2,
      },
      {
        id: 7,
        agent: 'Amy Elsner',
        name: 'Amr',
        city: 'Panama',
        amount: 2,
        price: 52.5,
        discount: 3,
      },
      {
        id: 8,
        agent: 'Anna Fali',
        name: 'Colombia',
        city: 'Colombia',
        amount: 3,
        price: 62.5,
        discount: 4,
      },
      {
        id: 9,
        agent: 'Amy Elsner',
        name: 'Romania',
        city: 'Romania',
        amount: 4,
        price: 72.5,
        discount: 5,
      },
      {
        id: 10,
        agent: 'Anna Fali',
        name: 'Tunisia',
        city: 'Tunisia',
        amount: 5,
        price: 82.5,
        discount: 6,
      },
      {
        id: 11,
        agent: 'Amy Elsner',
        name: 'Iceland',
        city: 'Iceland',
        amount: 1,
        price: 42.5,
        discount: 2,
      },
      {
        id: 12,
        agent: 'Anna Fali',
        name: 'United States',
        city: 'States',
        amount: 2,
        price: 52.5,
        discount: 3,
      },
      {
        id: 13,
        agent: 'Amy Elsner',
        name: 'Ecuador',
        city: 'Ecuador',
        amount: 3,
        price: 62.5,
        discount: 4,
      },
      {
        id: 14,
        agent: 'Anna Fali',
        name: 'Netherlands',
        city: 'Netherlands',
        amount: 4,
        price: 72.5,
        discount: 5,
      },
      {
        id: 15,
        agent: 'Stephen Shaw',
        name: 'Latvia',
        city: 'Latvia',
        amount: 5,
        price: 82.5,
        discount: 6065,
      },
      {
        id: 16,
        agent: 'Onyama Limba',
        name: 'Paraguay',
        city: 'Paraguay',
        amount: 1,
        price: 42.5,
        discount: 26540,
      },
      {
        id: 17,
        agent: 'Elwin Sharvill',
        name: 'Ivory Coast',
        city: 'Coast',
        amount: 2,
        price: 52.5,
        discount: 3560,
      },
      {
        id: 18,
        agent: 'Elwin Sharvill',
        name: 'Honduras',
        city: 'Honduras',
        amount: 5603,
        price: 6212.5,
        discount: 4650,
      },
      {
        id: 19,
        agent: 'Onyama Limba',
        name: 'Croatia',
        city: 'Croatia',
        amount: 4298,
        price: 1722.5,
        discount: 5054,
      },
      {
        id: 20,
        agent: 'Stephen Shaw',
        name: 'Zustralia',
        city: 'Zustralia',
        amount: 50564,
        price: 972.5,
        discount: 6600,
      },
      {
        id: 18,
        agent: 'Elwin Sharvill',
        name: 'Honduras',
        city: 'Honduras',
        amount: 5603,
        price: 6212.5,
        discount: 4650,
      },
      {
        id: 19,
        agent: 'Onyama Limba',
        name: 'Croatia',
        city: 'Croatia',
        amount: 4298,
        price: 1722.5,
        discount: 5054,
      },
      {
        id: 20,
        agent: 'Stephen Shaw',
        name: 'Zustralia',
        city: 'Zustralia',
        amount: 50564,
        price: 972.5,
        discount: 6600,
      },
      {
        id: 18,
        agent: 'Elwin Sharvill',
        name: 'Honduras',
        city: 'Honduras',
        amount: 5603,
        price: 6212.5,
        discount: 4650,
      },
      {
        id: 19,
        agent: 'Onyama Limba',
        name: 'Croatia',
        city: 'Croatia',
        amount: 4298,
        price: 1722.5,
        discount: 5054,
      },
      {
        id: 20,
        agent: 'Stephen Shaw',
        name: 'Zustralia',
        city: 'Zustralia',
        amount: 50564,
        price: 972.5,
        discount: 6600,
      },
            {
        id: 18,
        agent: 'Elwin Sharvill',
        name: 'Honduras',
        city: 'Honduras',
        amount: 5603,
        price: 6212.5,
        discount: 4650,
      },
      {
        id: 19,
        agent: 'Onyama Limba',
        name: 'Croatia',
        city: 'Croatia',
        amount: 4298,
        price: 1722.5,
        discount: 5054,
      },
      {
        id: 20,
        agent: 'Stephen Shaw',
        name: 'Zustralia',
        city: 'Zustralia',
        amount: 50564,
        price: 972.5,
        discount: 6600,
      },
    ];
  }

  rowAction(order: any): void {
    const { actionName, row } = order;
    switch (actionName) {
      case 'delete':
        this.removeOrder(row);
        break;
      case 'edit':
        this.editOrder(row);
        break;
      case 'copy':
        this.cloneOrder(row);
        break;
      default:
        window.alert('no event by this name');
    }
  }

  removeOrder(order: Order) {
    const {id} = order
    // this.orders = this.orders.filter((item) => item.id !== order.id);
    window.alert(`Delete Item ${id}`,);
  }

  editOrder(order: Order) {
    const {id} = order
    window.alert(`Edit Item ${id}`,);
  }

  cloneOrder(order: Order) {
    console.log('order clone', order)
    const {id} = order
    const tempMyObj = Object.assign({}, order);
    tempMyObj['name'] = `${tempMyObj.agent} Copied`;
    console.log('tempMyObj', tempMyObj)
    window.alert(tempMyObj.name);
  }

  columnsChange(data: TableColumn[]) {
    console.log('columnsChange', data)
  }
}
