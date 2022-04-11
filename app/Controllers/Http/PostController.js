'use strict'

const Post = use('App/Models/Post')

class PostController {
    async index({ request, response, view }) {
        const post = await Post.all()

        return view.render('posts.index', { posts: post.rows })
    }

    create({ request, response, view }) {
        return view.render('posts.create')
    }

    async store({ request, response, view, session }) {
        const post = new Post();

        post.title = request.input('title')
        post.content = request.input('content')
        await post.save()

        session.flash({ notification: 'Data Berhasil disimpan!' })
        return response.route('post.index')
    }

    async edit({ request, response, view, params }) {
        const id = params.id
        const post = await Post.find(id)

        return view.render('posts.edit', { post })
    }

    async update({ request, response, view, params, session }) {
        const id = params.id
        const post = await Post.find(id)

        post.title = request.input('title')
        post.content = request.input('content')
        await post.save();

        session.flash({ notification: 'Data berhasil diupdate!' })
        return response.route('post.index')
    }

    async delete({ request, response, view, params, session }) {
        const id = params.id
        const post = await Post.find(id)
        await post.delete()

        session.flash({ notification: 'Data berhasil dihapus!' })
        return response.route('post.index')
    }
}

module.exports = PostController