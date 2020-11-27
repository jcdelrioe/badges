import React from 'react';
import '../styles/BadgeNew.css';

import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge'
import BadgeForm from '../components/BadgeForm';
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    }
  };
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form, // Guardamos los valores anteriores del form
        [e.target.name]: e.target.value, // Guardamos los nuevs valores o sobreescribimos los que ya habian pero solo de e (evento)
      },
    });
  };

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    
    try{
      await api.badges.create(this.state.form)
      this.setState({ loading: false })
      
      this.props.history.push('/badges')
    }catch (error){
      this.setState({ loading: false, error: error })
    }
  }
  render() {
    if(this.state.loading){
      return <PageLoading />
    }
    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img className="BadgeNew__hero-image img-fluid" src={header} alt="Logo"/>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || 'FIRST_NAME'}
                lastName={this.state.form.lastName || 'LAST_NAME'}
                twitter={this.state.form.twitter || 'twitter'}
                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                email={this.state.form.email || 'EMAIL'}
                avatarURL="https://lh3.googleusercontent.com/ogw/ADGmqu9c092rxbVDNs46Z96V6rfvVyagI4iBgxtoR0LRmoU=s64-c-mo"/>
            </div>
            <div className="col-6">
              <h1>New Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BadgeNew;