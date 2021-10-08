import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from "expo-permissions"
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class TransactionScreen extends React.Component {
  constructor(){
    super(
      this.state={
      hascamerapermissions:null,
      scanned:false,
      scanneddata:"",
      buttonState:"normal"  
      
      }
    )
  }
getCameraPermissions=async()=>{
  const {status}=await Permissions.askAsync(PERMISSIONS.CAMERA)
this.setState({
  hascamerapermissions:status==="granted",
  buttonState:"clicked"
})
}

handleBarCodeScanned=async({type,data})=>{
  this.setState({
    scanned:true,
    scanneddata:data,
    buttonState:"normal"
  })
}  

    render(){
if(this.state.buttonState==="clicked" && this.state.hascamerapermissions){
return(
  <BarCodeScanner
  onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
  style={
    StyleSheet.absoluteFillObject
  }
  ></BarCodeScanner>
)
}

else if(this.state.buttonState==="normal"){


  return (
    <View style={styles.container}>
      <Text>TransactionScreen</Text>
      <Text>
        {this.state.hascamerapermissions===true? this.state.scanneddata:"request camera permission"}
      </Text>
<TouchableOpacity
onPress={this.getCameraPermissions}
>
  <Text>Scan qr code</Text>
</TouchableOpacity>
    </View>
  );
}
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
