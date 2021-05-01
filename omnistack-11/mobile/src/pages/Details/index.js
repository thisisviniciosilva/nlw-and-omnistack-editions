import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logo from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

export default function Incidents() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá, ${
    incident.name
  }, estou entrando em contato, pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}.`;

  function handleSendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function handleSendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>

        <Image source={logo} />
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentPropertyValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentPropertyValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentPropertyValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentPropertyValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contact}>
        <Text style={styles.contactTitle}>Salve o dia!</Text>
        <Text style={styles.contactTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.contactText}>Entre em contato via:</Text>

        <View style={styles.contactActions}>
          <TouchableOpacity
            style={styles.contactActionButton}
            onPress={handleSendWhatsApp}>
            <Text style={styles.contactActionButtonText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactActionButton}
            onPress={handleSendMail}>
            <Text style={styles.contactActionButtonText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
