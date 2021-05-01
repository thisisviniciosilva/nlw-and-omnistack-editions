import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 16,
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
    marginTop: 24,
  },

  incidentPropertyValue: {
    fontSize: 15,
    marginTop: 8,
    color: '#737380',
  },

  contact: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },

  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13131a',
    lineHeight: 30,
  },

  contactText: {
    fontSize: 15,
    color: '#737380',
    marginTop: 16,
    marginBottom: 16,
  },

  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  contactActionButton: {
    width: '48%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#e02041',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactActionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
