import React,{ useState, Fragment } from 'react';
import ServicesTable from './ServicesTable';
import ServicesAddForm from './ServicesAddForm';
import ServicesEditForm from './ServicesEditForm';



const Services = () => {

    const [editing, setEditing] = useState(false);
    const [service, setService] = useState([]);
    const [currentService, setCurrentService] = useState([]);
    const [cliente, setCliente] = useState([]);
    


    // React.useEffect( () => {
    //     getServices();
    //     // ListClient.Client.getClient();
    //     // async function getItemsClient() {
    //     //     let items = await this.getClient();
    //     //     setCliente(items);
    //     // }
    //     // getItemsClient();
    // },[setService]);

    const editRow = (service) => {

        setEditing(true);
    
        setCurrentService(
          { 
            id: service.id,	type_services_id: service.type_services_id,
            mode_services_id: service.mode_services_id,	areas_id: service.areas_id,	associate_id: service.associate_id,
            client_id: service.client_id, name_service: service.name_service, rate_variable: service.rate_variable,
            rate_fixed: service.rate_fixed,	rate_process: service.rate_process,	phone_service: service.phone_service,
            chat_service: service.chat_service,	chat_service_name: service.chat_service_name, fee_service: service.fee_service,
            date_service: service.date_service,	date_aplication: service.date_aplication, date_pay: service.date_pay,
            date_performance: service.date_performance

          }
        )
      }
    



    return (
        <Fragment>
            <div className="container">
              <div className="flex-row">
                <div className="flex-large">
                    <div className="col-md-auto">
                        {/* <Client 
                        // getClient={getClient}
                        /> */}
                    </div>
                  { 
                  editing ? (
                    <div>
                      <h2>Edit Service</h2>
                      <ServicesEditForm 
                    //   currentService={currentService} 
                    //   updateService={updateService}
                      />
                    </div>
                  ):(
                    <div>
                      <h2>Add Service</h2>
                      <ServicesAddForm 
                      //addService={addService} 
                      />
                    </div>
                  )
                  }
                  <div className="flex-large">
                  <h2>View Service</h2>
                  <ServicesTable 
                    services={service}
                    //deleteService={deleteService} 
                    editRow={editRow}
                    />
                </div>
              </div>
            </div>
        </div>  
      </Fragment>
    )
}

export default Services
