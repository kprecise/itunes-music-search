<template>
  <div class="main">
    <div class="search-filter">
      <h1>{{title}}</h1>
      <p class="instructional">Choose an artist to search:</p>
      <form v-on:submit.prevent="preventSubmission">
        <label for="search">Search</label>
        <input
                type="text"
                name="search"
                v-on:input="storeInput"
                v-on:keyup="handleEnterKey"
        />
        <b-button variant="primary" v-on:click="runSearch">
          {{button}}
        </b-button>
      </form>
      <p class="error">{{warningMessage}}</p>
    </div>
    <div class="results" v-bind:show-results="showResults">
      <div v-if="showResults">
        <h2>Search Results</h2>
        <b-card-group columns>
          <b-card v-for="item in musicCatalogue" :key="item.id">  
            <b-row>
              <b-col xs="12">
                <h3>{{ item.artistName }}</h3>
                <h4>{{ item.collectionName }}</h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col xs="2" md="12">
                <img v-bind:src="item.artworkUrl100" />
              </b-col>
              <b-col class="details" xs="10" md="12">
                <span>Songs:</span> {{ item.trackCount }}<br />
                <span>Genre:</span> {{ item.primaryGenreName }}<br />
                <span>Price:</span> ${{ item.collectionPrice }}<br />
                <span>Date:</span> {{ formatDate(item.releaseDate) }}<br />
                <span>Country:</span> {{ item.country }}<br />
                <div v-if="item.artistViewUrl">
                  <a v-bind:href="checkLink(item.artistViewUrl)">Buy on iTunes</a>
                </div>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col xs="12">
                <audio id="t-rex-roar" controls>
                  <source v-bind:src="item.previewUrl" />
                  Your browser does not support the <code>audio</code> element.
                </audio>
              </b-col>
            </b-row>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
        name: 'Search',
        props: {
            title: String,
            button: String
        },
        data: function() {
            return {
                status: 'noresults',
                userInput: '',
                warningMessage: '',
                musicCatalogue: [],
                showResults: false
            }
        },
        methods: {
            handleEnterKey: function(event) {
                if (event.keyCode === 13) {
                    this.runSearch()
                }
            },
            storeInput: function (event) {
                this.userInput = event.target.value
            },
            runSearch: function () {
                const url ='https://itunes.apple.com/search?term=';
                let self = this;
                if (this.userInput !== '') {
                    this.status = 'results';
                    let searchTerm = this.userInput.replace(/\s/g, '').toLowerCase();
                    axios
                        .get(url + searchTerm)
                        .then(function (response) {
                            if (response.data.results.length > 0) {
                                // handle success
                                self.musicCatalogue = response.data.results;
                                self.showResults = true;
                            } else {
                                self.warningMessage = 'There are no artists that match your search';
                            }
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);//eslint-disable-line
                        })
                } else {
                    self.warningMessage = 'Please enter a value'
                }
            },
            formatDate: function (date) {
                return moment(date).format('MMM Do YYYY');
            },
            checkLink: function (link) {
                if (link !== '') {
                    return link
                } else {
                    return 'No link'
                }
            },
            preventSubmission: function (event) {
                event.preventDefault();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    margin: 0 0 2em;
    text-align: center;
  }
  input {
    margin: 0 1em;
    line-height: 2.2;
    padding: 0 1em;
    background-color: #f5f5f5;
    border: 1px #00838f solid;
  }
  button {
    background: #00838f;
    color: #fff;
    font-weight: 800;
    border: 1px #00838f solid;
  }
  button:hover {
    background: #fff;
    color: #00838f;
    border: 1px #00838f solid;
  }
  label {
    text-indent: -9999px;
    position: absolute;
    overflow: hiidden;
    top: 0;
    left: 0;
  }
  .search-filter {
    text-align: center;
  }
  .results {
    margin-top: 4em;
    text-align: center;
  }
  h2 {
    font-size: 2em;
    font-weight: 800;
    color: #333;
    margin-bottom: 2em;
  }
  h3 {
    font-size: 1.75em;
    color: #015249;
    text-align: left;
    font-weight: 800;
  }
  h4 {
    font-size: 1.2em;
    font-weight: bold;
  }
  a {
    color: #015249;
    text-decoration: underline;
  }
  img {
    border: 1px #ccc solid;
    width: 100%;
  }
  p {
    font-size: 1em;
  }
  p.error {
    color: red;
    margin-top: 2em;
  }
  p.instructional {
    font-size: 1.3em;
  }
  p span {
    font-weight: bold;
  }
  ul {
    list-style-type: none;
  }
  .details {
    text-align: left;
    margin-top: 1em;
  }
  audio {
    width: 100%;
  }
  .card {
    margin-bottom: 1em;
    background-color: #fafafa;
    text-align: left;
  }

    @media only screen and (max-width: 767px) {
      .card-columns {
        column-count: 1;
      }
    }
    @media only screen and (min-width: 768px) {
      .card-columns {
        column-count: 4;
      }
    }
    @media only screen and (min-width: 1024px) {
      .card-columns {
        column-count: 5;
      }
    }  
</style>
