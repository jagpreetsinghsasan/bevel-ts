import {KubeConfig, CoreV1Api, Watch} from "@kubernetes/client-node"

export interface IKubectlOptions {
    kubectlContext: string;
    kubectlConfigFilePath: string;
}

export class Kubectl{
    public static readonly CLASS_NAME = "Kubectl";
    public readonly kubeConfig: KubeConfig;
    public readonly k8sApiClient: CoreV1Api;
    public get className(): string {
        return Kubectl.CLASS_NAME;
    }
    constructor(){
        this.kubeConfig = new KubeConfig();
        this.kubeConfig.loadFromDefault();
        this.k8sApiClient = this.kubeConfig.makeApiClient(CoreV1Api);
    }

    public async watchNamespace(): Promise<any>{
        const watch = new Watch(this.kubeConfig);
        const req = await watch.watch('/api/v1/namespaces',
        {},
        (type, apiObj, watchObj) => {
            if (type == 'ADDED') {
                console.log('ADDED' + JSON.stringify(apiObj.metadata.name));
            }
        },
        (err) => {
            console.log(err); 
        });
        setTimeout(() => { req.abort(); }, 100 * 1000);
    }
}