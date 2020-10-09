import React, {useContext} from 'react';
import { Context } from '../../../Store/appContext'

import { View, TextInput, TouchableOpacity } from 'react-native'
import { Text, Icon } from 'native-base';
import { Grid, Row, Col} from 'react-native-easy-grid'
import { Dropdown } from 'react-native-material-dropdown';

export default PayModal = (props) => {

  const { store, actions } = useContext(Context)
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  return(
      // FULL BACKGROUND
      <View style={styles.fullBackground}>
        {/* WHITE BOX BACKGROUND */}
        <View style={styles.whiteBackground, {color: currentStyle.background.color}}>        
          {/* MAIN BODY */}
          <Grid style={{marginVertical:10}}>
            <Col style={{justifyContent:'center'}}>
              {/* PAYMENT INSTRUCTION */}
              <Row style={{justifyContent:'center', alignSelf:'center', width:'80%'}}>
                <Text style={{fontSize:20, textAlign:'center', color: currentStyle.text.color}}>
                  Enter the type and amount of cash you're being paid
                </Text>
              </Row>
              {/* PAYMENT TYPE TEXT */}
              <Row style={{ justifyContent:'center', alignItems:'center', paddingTop:0}}>
                <Icon type='FontAwesome5' name='money-bill-wave'/>
                <Text style={{fontSize:24, textAlign:'center', color: currentStyle.text.color}}>
                {'  '}Payment Type
                </Text>
              </Row>
              {/* PAYMENT TYPE DROPDOWN */}
              <View style={{width:'70%', alignSelf:'center', marginTop:-30}}>
                <Dropdown label='Payment Type'
                  style={{alignSelf:'center', width:'50%', fontSize:24}}
                  data={[{value:'Cash'}, {value:'PayPal'}, {value:'Other'}]}/>
              </View>
              {/* CASH PAID TEXT */}
              <View style={{flexDirection:'row', justifyContent:'center', marginBottom:10, marginTop:25}}>
                <Icon type='FontAwesome5' name='dollar-sign'/>
                <Text style={{fontSize:24, textAlign:'center', color: currentStyle.text.color}}>
                  {'  '}Cash Paid
                </Text>
              </View>
              {/* CASH PAID TEXT INPUT */}
              <TextInput style={styles.cashpaidtextInput}
                placeholder='$100.00'
                placeholderTextColor='gray' />
              {/* BUTTONS ROW */}
              <Row style={{marginTop:20}}>
                {/* SUBMIT BUTTON */}
                <Col>
                  <TouchableOpacity onPress={()=> props.fn()}>
                    <Text style={{textAlign:'center', fontSize:24}}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </Col>
                {/* CANCEL BUTTON */}
                <Col>
                  <TouchableOpacity onPress={()=>props.setVisible(false)}>
                    <Text style={{textAlign:'center', fontSize:24}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </Col>
            </Row>
            </Col>
          </Grid>          
        </View>
      </View>
  )
}

const styles = {
  cashpaidtextInput:{
    padding:10, alignSelf:'center',fontSize:24, textAlign:'center',
    borderWidth:1, borderRadius:10, width:'50%', borderColor:'rgba(0,0,0,0.2)'},
  fullBackground:{
    backgroundColor:'rgba(0,0,0,0.6)', height:'150%', 
    alignContent:'stretch'},
  whiteBackground:{
    alignSelf:'center', backgroundColor:'white', 
    width:'80%', height:'40%', margin: 'auto', position: 'relative',
    top: '13%', left: 0, bottom: 0, right: 0}
}