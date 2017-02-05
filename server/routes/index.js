import DocumentsRoute from './documents';
import RolesRoute from './roles';
import UsersRoute from './users';

class IndexRoute {
    /**
     * 
     */
    static Index(app) {
        app.get('*', (req, res) => {
            res.status(200).send({
                "message": "welcome to document management api"
            });
        });
    }
    /**
     * 
     */
    static Roles(app){
        app.use('/roles', RolesRoute);
    }
    /**
     * 
     */
    static Users(app){
        app.use('/users', UsersRoute);
    }
    /**
     * 
     */
    static Documents(app){
        app.use('/documents', DocumentsRoute);
    }

}
export default IndexRoute;
