/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const SKILL_NAME = 'Datos del espacio';
const WELCOME_MESSAGE = '¡Bienvenido!';
const GET_FACT_MESSAGE = 'Aquí está tu dato. ';
const HELP_MESSAGE = 'Puedes pedirme un dato del espacio, o, puedes decir para... ¿Como te puedo ayudar?';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';
const STOP_MESSAGE = 'Hasta pronto';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================

const data = [
  'Las actuales naves espaciales tripuladas tardarían 700 siglos en llegar a las estrellas más cercanas.',
  'Los rayos pueden llegar a medir 48 km de largo, su espesor es menor que una pulgada y pueden alcanzar una temperatura equivalente la superficie del Sol, en cuyo núcleo (el del Sol) se consumen unos 600 millones de toneladas de hidrógeno, que se convierten en helio. Sobre la Tierra impactan alrededor de 2000 rayos provenientes de tormentas eléctricas. Un solo rayo puede liberar más de 1 millón de vatios de electricidad (más o menos 1,21 GigaVatios… lo necesario para que el Delorean consiga viajar en el tiempo).',
  'La luna está cuatrocientas veces más cerca de la Tierra que el sol, y es exactamente cuatrocientas veces más pequeña que este.',
  'Existen más de 10000 objetos elaborados por el hombre con un tamaño mayor que el de un pomelo orbitando a la Tierra. La basura espacial viaja a través del espacio a 29000 km por hora.',
  'La Estación Espacial Internacional pesa cerca de 500 toneladas y tiene las dimensiones de un campo de fútbol.',
  'Los astronautas trajeron aproximadamente 362 kg de rocas lunares a la Tierra, la mayoría de las cuales no han sido aun analizadas.',
  'Saturno flotaría si se pudiera encontrar un océano lo suficientemente grande.',
  'Un pedazo de una estrella de neutrones del tamaño de una cabeza de alfiler pesaría un millón de toneladas. Una estrella de neutrones cuyo diámetro fuese de 24 km pesaría más que el sol. Son tan densas que una sola cucharadita sería más pesada que toda la población terrestre.',
  'La sonda de investigación Helio Bé, se acercó al sol a la distancia record de 43,45 millones de kilómetros.',
  'Se cree que hace 65 millones de años, el impacto de un asteroide liberó la energía equivalente a 10 millones de bombas H y causó la extinción de la mayoría de las especies de dinosaurios.',
  'Se estima que la temperatura en el centro de la Tierra es de 5500 grados Celsius.',
  'En la actualidad más de 4000 satélites orbitan nuestro planeta.',
  'Venus es así de brillante a causa de su gruesa capa de nubes que refleja los rayos del sol.',
  'En nuestra galaxia, la Vía Láctea, hay más de 100000 millones de estrellas.',
  'Los científicos han descubierto alrededor de doscientos planetas fuera de nuestro sistema solar.',
  'El sol tarda aproximadamente 220 millones de años en completar una vuelta alrededor de la vía láctea.',
  'Normalmente se redondea la velocidad de la luz entorno a los 300000 km por segundo. La medición exacta es de 299792458 metros por segundo.',
  'La Tierra rota a una velocidad de 1609 km por hora, pero se desplaza a través del espacio a la increíble velocidad de 107826 km por hora.',
  'Los astronautas no pueden eructar porque la ingravidez no permite la separación de líquido y gas en sus estómagos.',
  'Una millonésima de la millonésima de la millonésima de la millonésima de la millonésima de segundo después del Big Bang, el universo ya tenía el tamaño de un guisante.',
  'Dentro de 5 mil millones de años el Sol se quedará sin combustible y se convertirá en una Gigante Roja.',
  'Si el sol fuese del tamaño de un balón de playa, Júpiter tendría el tamaño de una pelota de golf y la Tierra sería tan solo un guisante. Si el Sol midiese tan solo una pulgada de diámetro (2,54 cm), la estrella más cercana se encontraría a 716 km de distancia.',
  'Alrededor de 1000 billones de neutrinos del sol habrán atravesado tu cuerpo mientras escuchas esta frase.',
  'El cohete Saturno 5 que llevó al hombre a la luna desarrollaba una energía equivalente a 50 aviones Boing 747.',
  'Si cada estrella de la Vía Láctea tuviese el tamaño de un grano de sal, entre todas podrían llenar una piscina olímpica.'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const LaunchHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechOutput = WELCOME_MESSAGE + ' ' + HELP_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      //.withShouldEndSession(false)
      .withSimpleCard(SKILL_NAME, WELCOME_MESSAGE)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Perdona, ha ocurrido un error.')
      .reprompt('Perdona, ha ocurrido un error.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();