import ReactDOM from 'react-dom';
import React,{useEffect, useState} from 'react';
import { Table } from "antd";



 




function Almacenacomentarios({
    skuSeleccionado,
    setSkuSeleccionado
}) {

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          
        },
        {
          key: '2',
          name: 'John',
          
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }
        
      ];
      









    return (
        <div>
            <p>{skuSeleccionado}</p>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};

export { Almacenacomentarios }