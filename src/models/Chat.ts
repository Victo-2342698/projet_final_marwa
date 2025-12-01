import mongoose, { Schema, model } from 'mongoose';

export interface IChat {
  _id?: string;
  id: number;
  nom: string;
  age: number;
  race: string;
  sexe: string;
  description: string;
  images: string[];
  adopte: boolean;
  dateArrivee: Date;
  sterilise: boolean;
  vaccine: boolean;
}

/******************************************************************************
 *  ENUM utilisables (comme dans ton modèle jet-validator mais en mongoose)
 ******************************************************************************/

const racesPermises = ['Siamois', 'Persan', 'Bengal', 'Domestique', 'Sphynx'];
const sexesPermis = ['Mâle', 'Femelle'];

/******************************************************************************
 *  SCHEMA CHAT
 ******************************************************************************/

const ChatSchema = new Schema<IChat>({
  id: {
    type: Number,
    required: [true, "L'id est obligatoire"],
    min: [1, "L'id doit être supérieur à 0"],
  },

  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne doit pas dépasser 50 caractères'],
  },

  age: {
    type: Number,
    required: [true, "L'âge est obligatoire"],
    min: [0, "L'âge minimal est 0"],
    max: [25, "L'âge maximal est 25"],
  },

  race: {
    type: String,
    required: [true, 'La race est obligatoire'],
    enum: {
      values: racesPermises,
      message:
        "La race doit être l'une des suivantes : Siamois, Persan, Bengal, Domestique, Sphynx",
    },
  },

  sexe: {
    type: String,
    required: [true, 'Le sexe est obligatoire'],
    enum: {
      values: sexesPermis,
      message: "Le sexe doit être 'Mâle' ou 'Femelle'",
    },
  },

  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
    minlength: [10, 'La description doit contenir au moins 10 caractères'],
  },

  images: {
    type: [String],
    required: [true, 'Au moins une image est obligatoire'],
    validate: {
      validator: function (arr: string[]) {
        return arr.length >= 1;
      },
      message: 'Il doit y avoir au moins une image du chat',
    },
  },

  adopte: {
    type: Boolean,
    default: false,
  },

  dateArrivee: {
    type: Date,
    required: [true, "La date d'arrivée est obligatoire"],
    validate: {
      validator: function (v: Date) {
        return v <= new Date();
      },
      message: "La date d'arrivée ne peut pas être dans le futur",
    },
  },

  sterilise: {
    type: Boolean,
    required: [true, 'Veuillez indiquer si le chat est stérilisé'],
  },

  vaccine: {
    type: Boolean,
    required: [true, 'Veuillez indiquer si le chat est vacciné'],
  },
});

mongoose.pluralize(null);

export const Chat = model<IChat>('chats', ChatSchema);
