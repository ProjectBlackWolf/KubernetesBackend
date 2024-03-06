const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const k8s = require('@kubernetes/client-node');
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// Create a Kubernetes client
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const PodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    namespace: {
        type: String,
        required: true,
        trim: true
    },
    labels: {
        type: Object,
        required: true
    },
    containers: {
        type: Array,
        required: true
    },
    volumes: {
        type: Array,
        required: true
    },
    restartPolicy: {
        type: String,
        required: true,
        enum: ['Always', 'OnFailure', 'Never']
    },
    terminationGracePeriodSeconds: {
        type: Number,
        required: true
    },
    dnsPolicy: {
        type: String,
        required: true,
        enum: ['ClusterFirst', 'Default', 'None']
    },
    hostNetwork: {
        type: Boolean,
        required: true
    },
    hostIPC: {
        type: Boolean,
        required: true
    },
    hostPID: {
        type: Boolean,
        required: true
    },
    securityContext: {
        type: Object,
        required: true
    },
    imagePullSecrets: {
        type: Array,
        required: true
    },
    affinity: {
        type: Object,
        required: true
    },
    tolerations: {
        type: Array,
        required: true
    },
    nodeSelector: {
        type: Object,
        required: true
    },
    serviceAccountName: {
        type: String,
        required: true
    },
    priorityClassName: {
        type: String,
        required: true
    },
    schedulerName: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    readinessGates: {
        type: Array,
        required: true
    },
    runtimeClassName: {
        type: String,
        required: true
    },
    overhead: {
        type: Object,
        required: true
    },
    topologySpreadConstraints: {
        type: Array,
        required: true
    },
    automountServiceAccountToken: {
        type: Boolean,
        required: true
    },
    enableServiceLinks: {
        type: Boolean,
        required: true
    },
    shareProcessNamespace: {
        type: Boolean,
        required: true
    },
    preemptionPolicy: {
        type: String,
        required: true,
        enum: ['PreemptLowerPriority', 'Never']
    },
    hostAliases: {
        type: Array,
        required: true
    },
    initContainers: {
        type: Array,
        required: true
    },
    securityContext: {
        type: Object,
        required: true
    },
    imagePullSecrets: {
        type: Array,
        required: true
    },
    volumes: {
        type: Array,
        required: true
    },
    affinity: {
        type: Object,
        required: true
    },
    tolerations: {
        type: Array,
        required: true
    },
    nodeName: {
        type: String,
        required: true
    },
    serviceAccount: {
        type: String,
        required: true
    },
    restartPolicy: {
        type: String,
        required: true
    },
    terminationGracePeriodSeconds: {
        type: Number,
        required: true
    },
    dnsPolicy: {
        type: String,
        required: true
    },
    hostNetwork: {
        type: Boolean,
        required: true
    },
    hostPID: {
        type: Boolean,
        required: true
    },
    hostIPC: {
        type: Boolean,
        required: true
    },
    schedulerName: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    priorityClassName: {
        type: String,
        required: true
    },
    runtimeClassName: {
        type: String,
        required: true
    },
    readinessGates: {
        type: Array,
        required: true
    },
    overhead: {
        type: Object,
        required: true
    },
    topologySpreadConstraints: {
        type: Array,
        required: true
    },
    automountServiceAccountToken: {
        type: Boolean,
        required: true
    },
    enableServiceLinks: {
        type: Boolean,
        required: true
    },
    shareProcessNamespace: {
        type: Boolean,
        required: true
    },
    preemptionPolicy: {
        type: String,
        required: true
    },
    hostAliases: {
        type: Array,
        required: true
    },
    initContainers: {
        type: Array,
        required: true
    }
});

const Pod = mongoose.model('Pod', PodSchema);

module.exports = [Pod, k8sApi];