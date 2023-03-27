import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, ROUTES } from '../../constants';
import { showSuccess } from '../../screens/auth/utils/HelperFunction';
import { useNavigation } from '@react-navigation/native';
import { logOut, selectUser } from '../../Redux/Features/userSlice';

export default function DrawerItems(props) {
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const onLogoutAlert = () => {
    Alert.alert(
      'Logout',
      'Yakin, Anda Ingin keluar',
      [{ text: 'Yes', onPress: logout }, { text: 'No', }],
      { cancelable: true }
    )
  }

  const logout = () => {
    dispatch(logOut())
    showSuccess('Anda Berhasil LogOut');
  };

  return (
    (user !== null ?
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          margin: 0,
        }}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start' }} onPress={() => navigation.navigate(ROUTES.PROFILE_DRAWER)}>
          {user.img != ('/TokoBatu/web/upload/') ?
            <Image
              source={{
                uri: 'http://192.168.1.27:8080/' + user.img,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 120,
                marginLeft: 10,
                borderColor: COLORS.abu_abu,
                borderWidth: 2
              }}
            />
            :
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/5d/f4/18/5df418287735c4bc97bc8e4100d0a451.jpg',
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 120,
                marginLeft: 10,
              }}
            />
          }
          <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={{
              color: '#333',
              fontSize: 16,
              fontWeight: '700',
              paddingLeft: 15,
              marginTop: 3
            }}>{user.name}</Text>
            <Text style={{
              color: '#333',
              fontSize: 14,
              fontWeight: '400',
              paddingLeft: 15,
              marginTop: 5
            }}>{user.email}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{ color: COLORS.black }}>________________________________________</Text>
        </View>

        <DrawerContentScrollView {...props}>
          <View
            style={{
              paddingTop: 10,
            }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              paddingVertical: 10,
            }}
            onPress={onLogoutAlert}>
            <View style={{ flexDirection: 'row', marginLeft: 10, }}>
              <Icon name="log-out-outline" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 10, fontWeight: '700', marginTop: 1 }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      :
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          margin: 0,
        }}>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}
            onPress={() => navigation.navigate(ROUTES.LOGIN_DRAWER)}>
            <Icon name="log-in-outline" size={30} color="#333" />
            <Text style={{ color: '#333', fontSize: 18, paddingLeft: 10, fontWeight: '700', marginTop: 1 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <DrawerContentScrollView {...props}>
          <View
            style={{
              paddingTop: 10,
            }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
    )
  );
}