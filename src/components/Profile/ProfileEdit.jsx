import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userAvatar from '../../assets/images/avatar.png';
import defaultCover from '../../assets/images/cover.jpg';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { fetchUserProfile, profileInputHandler } from '../../redux/actions';

export class ProfileEdit extends Component {
  handleInput = (e) => {
    const { handleInput } = this.props;
    handleInput({ field: e.target.name, value: e.target.value });
  };

  render() {
    const { getUserProfile, currentUser } = this.props;
    getUserProfile(currentUser.profile.username);

    return (
      <section className="main-content content-margin">
        <div className="container">
          <div className="profile-view">
            <div className="profile-cover" style={{ backgroundImage: `url("${defaultCover}")` }}>
              <div className="profile-avatar-wrapper">
                <label htmlFor="file" style={{ color: 'rgb(248, 248, 248)' }}>
                  <i className="fa fa-pencil fa-lg" />
                  <input type="file" className="hide" name="file" id="file" accept="image/*" />
                </label>
                <img
                  src={currentUser.profile.image || userAvatar}
                  className="profile-avatar edit"
                  alt=""
                />
              </div>
            </div>
            <div className="profile-form">
              <div className="small-input">
                <div className="single-input">
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={this.handleInput}
                    value={currentUser.profile.firstName}
                  />
                </div>
                <div className="single-input">
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={this.handleInput}
                    value={currentUser.profile.lastName}
                  />
                </div>
              </div>
              <div className="small-input">
                <div className="single-input">
                  <select
                    name="gender"
                    id="gender"
                    onChange={this.handleInput}
                    value={currentUser.profile.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div className="single-input">
                  <Input
                    name="birthDate"
                    type="text"
                    onFocus="(this.type='date')"
                    onBlur="(this.type='text')"
                    placeholder="Birth Date"
                    onChange={this.handleInput}
                  />
                </div>
              </div>
              <div>
                <textarea
                  name="bio"
                  type="text"
                  className="large-input"
                  placeholder="Bio"
                  value={currentUser.profile.bio || ''}
                  onChange={this.handleInput}
                />
              </div>
              <div className="col-12 content-right">
                <Button classes="primary">SAVE</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ currentUser }) => ({ currentUser });

export const mapDispatchToProps = dispatch => ({
  getUserProfile: username => dispatch(fetchUserProfile(username)),
  handleInput: ({ field, value }) => dispatch(profileInputHandler({ field, value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileEdit);
