import React, { useContext, useState } from 'react';
import { Context } from '../Store/appContext'
import { useNavigation, useRoute } from '@react-navigation/native'

import { TouchableOpacity, View, StatusBar } from 'react-native'
import { Text, Icon, Header } from 'native-base';
import { Row } from 'react-native-easy-grid'
import Spinner from 'react-native-loading-spinner-overlay'

export default CategoriesScreen = (props) => {
    const { store, actions } = useContext(Context) 
    const [ loading, setLoading ] = useState(false) 

    const navigation = useNavigation()
    const route = useRoute()

    console.log('route.params', route.params)

    const goToCategory = async() => {
        setLoading(true)
        var answer1 = await actions.tracker.getCurrent()
        var answer1 = await actions.tracker.getUpcoming()

        var answer2 = await actions.tracker.getPast()
        var answer3 = await actions.tournament.getInitial()
        setLoading(false)
        if (store.initialSetup){
            var e = await actions.profile.initialSetupCurrent(false)
            navigation.navigate('Hendon Setup')
        } else {
            actions.profile.initialSetupCurrent(false)
            var e = await navigation.push('Drawer', {screen:'Home'})
        }
        
    }
    
    return(
        <View style={{backgroundColor:'green', flex:1, 
            height:'100%', flexDirection:'column'}}>
            <Spinner visible={loading} />
            <StatusBar barStyle="light-content" backgroundColor={'green'} />
            <Header style={{backgroundColor:'green'}}>
                <Text style={{color:'white', marginTop:15, 
                    fontSize:24,textAlignVertical:'center'}}>
                    Choose a Category
                </Text>
            </Header>
                {/* FIRST CATEGORY ROW */}
            <Row style={{height:200}}>
                {/* POKER CATEGORY */}
                <TouchableOpacity onPress={()=> goToCategory()} 
                    style={{width:'50%'}}>
                    <View style={{ backgroundColor:'black', height:200, 
                        justifyContent:'center'}}>
                    <Icon style={{marginBottom:10,
                        color:'white', alignSelf:'center', fontSize:80}}
                        type={'MaterialCommunityIcons'} name={'poker-chip'}/>
                        <Text style={{textAlign:'center', color:'white'}}>
                            Poker
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* GOLF CATEGORY */}
                <View style={{width:'50%',backgroundColor: '#228B22',justifyContent:'center'}}>
                    <Icon style={{color:'white', marginBottom:10, 
                        alignSelf:'center', fontSize:80}}
                        type={'MaterialCommunityIcons'} name={'golf'}/>
                    <Text style={{textAlign:'center', color:'white'}}>
                        Golf{'\n'}(Coming Soon)
                    </Text>
                </View>
            </Row>
            {/* FIRST CATEGORY ROW - END */}

            {/* SECOND CATEGORY ROW - BEGIN*/}
            <Row style={{height:200}}>

                {/* BOWLING CATEGORY */}
                <View  style={{width:'50%',backgroundColor: 'orange', 
                    color:'white', flexDirection:'column',justifyContent:'center'}}>
                    <Icon style={{color:'white', marginBottom:10, 
                        alignSelf:'center', fontSize:80}}
                        type={'MaterialCommunityIcons'} name={'bowling'}/>
                    <Text style={{textAlign:'center', color:'white'}}>
                        Bowling{'\n'}(Coming Soon)
                    </Text>
                </View>

                {/* FISHING CATEGORY */}
                <View style={{width:'50%',backgroundColor: 'blue', 
                    flexDirection:'column',justifyContent:'center'}}>
                    <Icon style={{color:'white', marginBottom:10,
                        alignSelf:'center', fontSize:80}}
                        type={'MaterialCommunityIcons'} name={'fish'}/>
                    <Text style={{textAlign:'center', color:'white'}}>
                        Fishing{'\n'}(Coming Soon)
                    </Text>
                </View>          
            </Row>
            {/* SECOND CATEGORY ROW - END*/}
        </View>
    )
}