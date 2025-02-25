"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var browser_util_1 = require("./browser_util");
var contrib = require("./contrib");
exports.contrib = contrib;
var xhr_dataset = require("./data/xhr-dataset");
exports.xhr_dataset = xhr_dataset;
var environment = require("./environment");
exports.environment = environment;
var environment_1 = require("./environment");
var gpgpu_util = require("./kernels/webgl/gpgpu_util");
exports.gpgpu_util = gpgpu_util;
var webgl_util = require("./kernels/webgl/webgl_util");
exports.webgl_util = webgl_util;
var conv_util = require("./ops/conv_util");
exports.conv_util = conv_util;
var test_util = require("./test_util");
exports.test_util = test_util;
var util = require("./util");
exports.util = util;
var version_1 = require("./version");
exports.version = version_1.version;
var checkpoint_loader_1 = require("./data/checkpoint_loader");
exports.CheckpointLoader = checkpoint_loader_1.CheckpointLoader;
var dataset_1 = require("./data/dataset");
exports.InMemoryDataset = dataset_1.InMemoryDataset;
var input_provider_1 = require("./data/input_provider");
exports.InCPUMemoryShuffledInputProviderBuilder = input_provider_1.InCPUMemoryShuffledInputProviderBuilder;
exports.InGPUMemoryShuffledInputProviderBuilder = input_provider_1.InGPUMemoryShuffledInputProviderBuilder;
var xhr_dataset_1 = require("./data/xhr-dataset");
exports.XhrDataset = xhr_dataset_1.XhrDataset;
var environment_2 = require("./environment");
exports.ENV = environment_2.ENV;
exports.Environment = environment_2.Environment;
var graph_1 = require("./graph/graph");
exports.Graph = graph_1.Graph;
exports.SymbolicTensor = graph_1.SymbolicTensor;
var graph_runner_1 = require("./graph/graph_runner");
exports.GraphRunner = graph_runner_1.GraphRunner;
exports.MetricReduction = graph_runner_1.MetricReduction;
var initializers_1 = require("./graph/initializers");
exports.ConstantInitializer = initializers_1.ConstantInitializer;
exports.OnesInitializer = initializers_1.OnesInitializer;
exports.RandomNormalInitializer = initializers_1.RandomNormalInitializer;
exports.RandomTruncatedNormalInitializer = initializers_1.RandomTruncatedNormalInitializer;
exports.RandomUniformInitializer = initializers_1.RandomUniformInitializer;
exports.TensorInitializer = initializers_1.TensorInitializer;
exports.VarianceScalingInitializer = initializers_1.VarianceScalingInitializer;
exports.ZerosInitializer = initializers_1.ZerosInitializer;
var session_1 = require("./graph/session");
exports.CostReduction = session_1.CostReduction;
exports.Session = session_1.Session;
var backend_cpu_1 = require("./kernels/backend_cpu");
exports.MathBackendCPU = backend_cpu_1.MathBackendCPU;
exports.NDArrayMathCPU = backend_cpu_1.NDArrayMathCPU;
var backend_webgl_1 = require("./kernels/backend_webgl");
exports.MathBackendWebGL = backend_webgl_1.MathBackendWebGL;
exports.NDArrayMathGPU = backend_webgl_1.NDArrayMathGPU;
var gpgpu_context_1 = require("./kernels/webgl/gpgpu_context");
exports.GPGPUContext = gpgpu_context_1.GPGPUContext;
var math_1 = require("./math");
exports.NDArrayMath = math_1.NDArrayMath;
var matmul_1 = require("./ops/matmul");
exports.MatrixOrientation = matmul_1.MatrixOrientation;
var adadelta_optimizer_1 = require("./optimizers/adadelta_optimizer");
exports.AdadeltaOptimizer = adadelta_optimizer_1.AdadeltaOptimizer;
var adagrad_optimizer_1 = require("./optimizers/adagrad_optimizer");
exports.AdagradOptimizer = adagrad_optimizer_1.AdagradOptimizer;
var adam_optimizer_1 = require("./optimizers/adam_optimizer");
exports.AdamOptimizer = adam_optimizer_1.AdamOptimizer;
var adamax_optimizer_1 = require("./optimizers/adamax_optimizer");
exports.AdamaxOptimizer = adamax_optimizer_1.AdamaxOptimizer;
var momentum_optimizer_1 = require("./optimizers/momentum_optimizer");
exports.MomentumOptimizer = momentum_optimizer_1.MomentumOptimizer;
var optimizer_1 = require("./optimizers/optimizer");
exports.Optimizer = optimizer_1.Optimizer;
var rmsprop_optimizer_1 = require("./optimizers/rmsprop_optimizer");
exports.RMSPropOptimizer = rmsprop_optimizer_1.RMSPropOptimizer;
var sgd_optimizer_1 = require("./optimizers/sgd_optimizer");
exports.SGDOptimizer = sgd_optimizer_1.SGDOptimizer;
var tensor_1 = require("./tensor");
exports.Array1D = tensor_1.Array1D;
exports.Array2D = tensor_1.Array2D;
exports.Array3D = tensor_1.Array3D;
exports.Array4D = tensor_1.Array4D;
exports.NDArray = tensor_1.NDArray;
exports.Scalar = tensor_1.Scalar;
exports.Tensor = tensor_1.Tensor;
exports.Tensor1D = tensor_1.Tensor1D;
exports.Tensor2D = tensor_1.Tensor2D;
exports.Tensor3D = tensor_1.Tensor3D;
exports.Tensor4D = tensor_1.Tensor4D;
exports.variable = tensor_1.variable;
exports.Variable = tensor_1.Variable;
var types_1 = require("./types");
exports.Rank = types_1.Rank;
var weights_loader_1 = require("./weights_loader");
exports.loadWeights = weights_loader_1.loadWeights;
__export(require("./ops/ops"));
__export(require("./train"));
__export(require("./globals"));
exports.setBackend = environment_1.Environment.setBackend;
exports.getBackend = environment_1.Environment.getBackend;
exports.memory = environment_1.Environment.memory;
exports.nextFrame = browser_util_1.BrowserUtil.nextFrame;
