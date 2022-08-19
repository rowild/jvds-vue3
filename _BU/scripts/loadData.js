
import { api } from 'boot/axios'
import { $error, $warn, $info, $success, $ongoing } from '../scripts/Notifications'

const loadData = async (what, successMsg = '', errorMsg = '') => {
  return new Promise((resolve,reject) => {
    api.get(what())
      .then(async (response) => {
        if(successMsg) {
          $info( successMsg )
        }
        // console.log('response.data.data =', response.data.data);
        resolve( response.data.data );
      })
      .catch((error) => {
        $error( error.message )
        if(errorMsg) {
          $error( errorMsg )
        }

        reject( error.response )
     })
   })
}

export default loadData