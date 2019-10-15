<template>
  <div class="article-container">
  	<div class="form-container m-2">
		<form @submit.prevent="addArticle">

			<div class="form-group">
			  <input type="text" class="form-control" v-model="article.title" placeholder="Enter the Title">
			</div>
			<div class="form-group">
			  <textarea class="form-control" v-model="article.body"></textarea>
			</div>
			<button class="btn btn-primary">Save</button>
		</form>
	</div>
    <div class="card m-2" v-for="article in articles" v-bind:key="article.id">
        <div class="card-body">
            <h5 class="card-title">{{article.title}}</h5>
                <p class="card-text">{{article.body}}</p>

                <button class="btn btn-success" @click="editArticle(article)">Edit</button>
                <button class="btn btn-danger" @click="deleteArticle(article.id)">Delete</button>
        </div>

    </div><!-- card -->
    <nav aria-label="Page navigation example">
		<ul class="pagination">
		    <li class="page-item" v-bind:class="[{disabled:!pagination.prev_page_url}]"><a class="page-link" href="#" @click="fetchArticles(pagination.prev_page_url)">Previous</a></li>
		    <li class="page-item"><a class="page-link text-dark" href="#">Page {{pagination.current_page}} of {{pagination.last_page}}</a></li>
		    <li class="page-item" v-bind:class="[{disabled:!pagination.next_page_url}]"><a class="page-link" href="#" @click="fetchArticles(pagination.next_page_url)">Next</a></li>
		</ul>
	</nav>
</div> <!-- article container -->
</template>


<script>
  export default{

 	 data(){
		    return {
		      articles : [],
		      article : {
		      	id: '',
		      	title: '',
		      	body: ''
		      	},
		      article_id:'',
		      pagination: {},
		      edit: false
		    };

	    },

	    created(){

	    	this.fetchArticles();

	    },

	    methods:{

	    	fetchArticles(page_url){
	    		page_url=page_url || '/api/articles'
	    		let vm=this;
	    		fetch(page_url)
		    		.then(res=>res.json())
		    		  .then(res=>{
		    				// console.log(res);
		    				this.articles=res.data;
		    				vm.makePagination(res.meta,res.links);
		    			})
		    		  .catch(err=>console.log(err));
	    	},
	    	makePagination(meta,links){
	    		let pagination={
	    			current_page : meta.current_page,
	    			last_page : meta.last_page,
	    			next_page_url : links.next,
	    			prev_page_url : links.prev
	    		}
	    		this.pagination=pagination;
	    	},

	    	deleteArticle(id){
	    		if(confirm('Are You sure ?')){

	    			fetch('api/article/'+id,{
	    				method: 'delete'
	    			})
	    			.then(res=>res.json())
	    			.then(data=>{
	    				alert('Article Removed');
	    				this.fetchArticles();
	    			})
	    			.catch(err=>console.log(err))

	    		}

	    	},

	    	addArticle(){

	    		if(this.edit===false){
	    			//Add
	    			fetch('api/article',{
	    				method: 'post',
	    				body: JSON.stringify(this.article),
	    				headers:{
	    					'content-type': 'application/json'
	    				}
	    			})
	    			.then(res=>res.json())
	    			.then(data=>{
	    				this.article.title='';
	    				this.article.body='';
	    				alert('Article Added');
	    				this.fetchArticles();
	    			})
	    			.catch(err=>console.log(err));

	    		}
	    		else{
	    			//Update
	    			fetch('api/article',{
	    				method: 'put',
	    				body: JSON.stringify(this.article),
	    				headers:{
	    					'content-type': 'application/json'
	    				}
	    			})
	    			.then(res=>res.json())
	    			.then(data=>{
	    				this.article.title='';
	    				this.article.body='';
	    				alert('Article Updated ');
	    				this.fetchArticles();
	    			})
	    			.catch(err=>console.log(err));

	    		}

	    	},
	    	editArticle(article){
	    		this.edit=true;
	    		this.article.id=article.id;
	    		this.article.article_id=article.id;
	    		this.article.title=article.title;
	    		this.article.body=article.body;


	    	}

	    }//end of methods



    };//end of default
</script>