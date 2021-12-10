const MySchema = {
  version: '0.0.1',
  indexes: {
    primary: { hash: 'id', sort: 'city' },
    // gs1: { hash: 'gs1pk', sort: 'gs1sk', follow: true },
  },
  models: {
    User: {
      // pk: { type: String, value: 'account:${accountName}' },
      // sk: { type: String, value: 'user:${email}' },
      id: { type: String, required: true },
      city: { type: String, required: true },
      data: { type: String },
      // accountName: { type: String, required: false },
      // email: { type: String, required: false },
      // firstName: { type: String, required: false },
      // lastName: { type: String, required: false },
      // username: { type: String, required: false },
      // role: { type: String, enum: ['user', 'admin'], required: false, default: 'user' },
      balance: { type: Number },
      status: { type: String },
      // gs1pk: { type: String, value: 'user-email:${city}' },
      // gs1sk: { type: String, value: 'user:' },
    },
  },
};
export default MySchema;
