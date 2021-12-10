const Profile = {
  version: '1.0.0',
  indexes: {
    primary: { hash: 'id', sort: 'document' },
  },
  models: {
    Profile: {
      id: { type: String, required: true },
      document: { type: String, required: true },
      // status: { type: String, required: true },
      // email: { type: String, required: true },
      // edad: { type: Number },
      // created_at: { type: String, required: true },
    },
  },
};
export default Profile;
